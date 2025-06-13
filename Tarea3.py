from flask import Flask, render_template, request, redirect, jsonify, url_for
from sqlalchemy import select, cast, String
from datetime import datetime
from database import db
import re

app = Flask(__name__)
app.secret_key = 'wawa'

@app.route("/", methods=["GET"])
def index():
    actividades = db.obtener_actividades(5,0)
    #print("imprimediando actividades: ")
    #print(actividades)
    return render_template("portada.html", actividades=actividades)

@app.route('/agregar_actividad', methods=['GET', 'POST'])
def agregar_actividad():
    if request.method == 'POST':
        errors=[]
        data = {
            'region': request.form['region'],
            'comuna': request.form['comuna'],
            'sector': request.form.get('sector'),
            'nombre': request.form['nombre'],
            'email': request.form['email'],
            'celular': request.form.get('numero'),
            'dia_hora_inicio': request.form['inicio'], 
            'dia_hora_termino': request.form.get('final'),
            'descripcion': request.form.get('desc'),
            'temas': request.form.getlist('tema'),
            'glosas': request.form.getlist('glosa_otro'),
            'contactos': [
                {
                    'nombre': request.form.get('contactar_nombre'),
                    'identificador': request.form.get('contactar_identificador')
                }
            ]
        }
        #print("sin archivos")
        archivos = []
        #print(archivos)
        if 'foto' in request.files:
            #print("mirando fotos")
            for f in request.files.getlist('foto'):
                if f.filename != '':
                    #print("filename no es nada")
                    filepath = f"static/uploads/{f.filename}" 
                    f.save(filepath)
                    archivos.append({'filename': f.filename, 'filepath': filepath})
        #print(data)
        ok = db.insertar_actividad(data, archivos)
        if ok:
            return redirect(url_for('index'))
        else:
            return render_template('agregar_actividad.html', data=data)

    return render_template('agregar_actividad.html')

@app.route("/estadisticas", methods=["GET"])
def stats():
    return render_template("estadisticas.html")

@app.route("/lista_actividades", methods=["GET"])
def actList():
    print("Listaaaaaaa")
    actividades = db.obtener_actividades(100,0)
    return render_template("lista_actividades.html", actividades=actividades)

@app.route('/agregar_actividad_info', methods=['GET'])
def agregar_actividad_info():
    if request.method == 'GET':
        try:
            query = select(
                cast(db.Actividad.dia_hora_inicio, String).label('dia_hora_inicio'),
                db.Actividad.comuna,
                db.ActividadTema.tema.label('tema_nombre')
            ).join(db.Actividad.temas)
            with db.engine.connect() as conn:
                result = conn.execute(query)
                datos = [{
                'dia_hora_inicio': row.dia_hora_inicio,
                'comuna': row.comuna,
                'tema_nombre': row.tema_nombre
            } for row in result]
                
            return jsonify({"status": "ok","data": datos})
        except Exception as e:
            print(f"Error al obtener actividades: {str(e)}")
            return jsonify({"status": "error","message": "Error al obtener datos"
            }), 500

@app.route('/agregar_comentario', methods=['POST'])
def agregar_comentario():
    errors = []
    nombre = request.form.get('nombre', '').strip()
    texto = request.form.get('texto', '').strip()
    actividad_id = request.form.get('actividad_id')
    if not (3 <= len(nombre) <= 80):
        errors.append("Nombre debe tener entre 3-80 caracteres")
    if len(texto) < 5:
        errors.append("Comentario debe tener al menos 5 caracteres")
    if not actividad_id or not actividad_id.isdigit():
        errors.append("ID de actividad inválido")
    if errors:
        return jsonify({"status": "error", "errors": errors})
    session = db.SessionLocal()
    try:
        nuevo_comentario = db.Comentario(
            nombre=nombre,
            texto=texto,
            actividad_id=int(actividad_id),
            fecha=datetime.now()
        )
        session.add(nuevo_comentario)
        session.commit()
        return jsonify({"status": "ok"})
    
    except Exception as e:
        session.rollback()
        return jsonify({"status": "error", "errors": [str(e)]})
    
    finally:
        session.close()

@app.route('/obtener_comentarios/<int:actividad_id>', methods=['GET'])
def obtener_comentarios(actividad_id):
    try:
        session = db.SessionLocal()
        comentarios = session.query(db.Comentario).filter(
           db.Comentario.actividad_id == actividad_id
        ).order_by(db.Comentario.fecha.desc()).all()
        
        comentarios_data = [{
            'nombre': c.nombre,
            'texto': c.texto,
            'fecha': c.fecha.strftime('%Y-%m-%d %H:%M:%S')
        } for c in comentarios]
        
        return jsonify({'status': 'ok','comentarios': comentarios_data})
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500
    finally:
        session.close()

@app.route('/validar_actividad', methods=['POST'])
def validar_actividad():
    errors=[]
    dia_hora_termino = request.form.get('final')
    if dia_hora_termino == "":
        dia_hora_termino = None
    data = {
        'region': request.form['region'],
        'comuna': request.form['comuna'],
        'sector': request.form.get('sector'),
        'nombre': request.form['nombre'],
        'email': request.form['email'],
        'celular': request.form.get('numero'),
        'dia_hora_inicio': request.form['inicio'], 
        'dia_hora_termino': dia_hora_termino,
        'descripcion': request.form.get('desc'),
        'temas': request.form.getlist('tema'),
        'glosas': request.form.getlist('new_tema'),
        'contactos': []
    }
    contacto_nombre = request.form.get('contactar_nombre')
    contacto_identificador = request.form.get('url')
    if contacto_nombre and contacto_identificador:
        data['contactos'].append({
            'nombre': contacto_nombre,
            'identificador': contacto_identificador
        })
    #print("sin archivos")
    archivos = []
    #print(archivos)
    if 'foto' in request.files:
        #print("mirando fotos")
        for f in request.files.getlist('foto'):
            if f.filename != '':
                #print("filename no es nada")
                filepath = f"static/uploads/{f.filename}" 
                f.save(filepath)
                archivos.append({'filename': f.filename, 'filepath': filepath})
    if not data['region']:
        errors.append("No hay región")
    if not data['comuna']:
        errors.append("No hay comuna")
    if data['sector']:
        if len(data['sector'])>100:
            errors.append("Sector muy largo (>100)")
    if not data['nombre']:
        errors.append("No hay nombre")
    if data['nombre'] and len(data['nombre'])>200:
        errors.append("Nombre muy largo (>200)")
    if not data['email']:
        errors.append("No hay email")
    if data['email']:
        if not bool(re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",data['email'])):
            errors.append("Formato de email incorrecto")
    if data['celular']:
         if not re.match(r"^\+\d{3}\.\d{8}$", data['celular']):
             errors.append("Formato de celular incorrecto (+XXX.XXXXXXXX)")
    if contacto_nombre:
        #print(data['contactos'][0]['nombre'])
        #print(data['contactos'][0]['identificador'])
        if not contacto_identificador:
            errors.append("No hay URL para el contacto")
        else:
            if len(contacto_identificador)>50 or len(contacto_identificador)<4:
                errors.append("Contacto de largo incorrecto (>50 o < 4)")
    if not data['dia_hora_inicio']:
        errors.append("No hay hora inicio")
    if data['dia_hora_termino'] and data['dia_hora_inicio']:
        inicio = datetime.fromisoformat(data['dia_hora_inicio'])
        fin = datetime.fromisoformat(data['dia_hora_termino'])
        if (fin-inicio).total_seconds()<10800:
            errors.append("La actividad debe durar al menos 3 horas")
    if not data['temas'][0]:
        errors.append("No hay tema")   
    if data['temas'][0] and data['temas'][0]=='otro' and not data['glosas'][0]:
        errors.append("Especifique el tema")
    if len(archivos)==0:
        errors.append("No hay foto") 
    if errors:
        return jsonify({"status": "error", "errors": errors})
    print(data)
    ok = db.insertar_actividad(data, archivos)
    if ok:
        return jsonify({"status": "ok", "data": data})
    else:
        return render_template('agregar_actividad.html', data=data)

@app.errorhandler(404)
def pagina_no_encontrada(error):
    return render_template('pagina_no_encontrada.html', error=error), 404
    