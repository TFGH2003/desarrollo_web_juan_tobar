from flask import Flask, render_template, request, redirect,flash, url_for

from database import db

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
        data = {
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
