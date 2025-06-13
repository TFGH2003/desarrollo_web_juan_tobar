from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


class Actividad(Base):
    __tablename__ = "actividad"
    id = Column(Integer, primary_key=True, autoincrement=True)
    comuna = Column(String(100))
    sector = Column(String(100))
    nombre = Column(String(200), nullable=False)
    email = Column(String(100), nullable=False)
    celular = Column(String(15))
    dia_hora_inicio = Column(DateTime, nullable=False)
    dia_hora_termino = Column(DateTime)
    descripcion = Column(String(500))
    temas = relationship("ActividadTema", backref="actividad")
    contactos = relationship("ContactarPor", backref="actividad")
    archivos = relationship("Archivo", backref="actividad")

class ActividadTema(Base):
    __tablename__ = "actividad_tema"
    id = Column(Integer, primary_key=True, autoincrement=True)
    tema = Column(Enum('musica', 'deporte', 'ciencias', 'religion', 'politica', 'tecnologia', 'juegos', 'baile', 'comida', 'otro'), nullable=False)
    glosa_otro = Column(String(15))
    actividad_id = Column(Integer, ForeignKey("actividad.id"), nullable=False)

class ContactarPor(Base):
    __tablename__ = "contactar_por"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador = Column(String(150), nullable=False)
    actividad_id = Column(Integer, ForeignKey("actividad.id"), nullable=False)

class Archivo(Base):
    __tablename__ = "foto"
    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(Integer, ForeignKey("actividad.id"), nullable=False)

class Comentario(Base):
    __tablename__ = "comentario"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    texto = Column(String(300), nullable=False)
    fecha = Column(DateTime, nullable=False, default=datetime.now)
    actividad_id = Column(Integer, ForeignKey("actividad.id"), nullable=False)
    
def insertar_actividad(data, archivos):
    session = SessionLocal()
    try:
        actividad = Actividad(
            comuna = data['comuna'],
            sector = data.get('sector'),
            nombre = data['nombre'],
            email = data['email'],
            celular = data.get('celular'),
            dia_hora_inicio = data['dia_hora_inicio'],
            dia_hora_termino = data.get('dia_hora_termino'),
            descripcion = data.get('descripcion')
        )
        session.add(actividad)
        session.flush()
        glosas = data.get('glosas', [])
        #print("!!!! i_tema: ")
        #print(data['temas'])
        for i, tema in enumerate(data['temas']):
            glosa_otro = glosas[i] if tema == 'otro' and i < len(glosas) else None
            #print(actividad.id)
            #print(tema)
            if glosa_otro is None:
                wawar = "wawa"
            else:
                wawar = glosa_otro
            #print("1")    
            #print(wawar)
            session.add(ActividadTema(
                actividad_id=actividad.id,
                tema=tema,
                glosa_otro=wawar
            ))
            #print("2")
        #print("!!!! i_contactos: ")
        #print(data['contactos'])
        if 'contactos' in data and data['contactos']:
            for contacto in data['contactos']:
                wawar=contacto['identificador']
                if not contacto['identificador'].strip():
                    wawar="wawa"
                #print(actividad.id)
                #print(contacto['nombre'])
                #print(wawar)
                session.add(ContactarPor(
                    actividad_id=actividad.id,
                    nombre=contacto['nombre'],
                    identificador=wawar
                ))
        #print("!!!! i_archivos: ")
        #print(archivos)
        for archivo in archivos:
            #print(actividad.id)
            #print(archivo['filename'])
            #print(archivo['filepath'])
            session.add(Archivo(
                actividad_id=actividad.id,
                nombre_archivo=archivo['filename'],
                ruta_archivo=archivo['filepath']
            ))
        print("||||||||| COMMIT |||||||||")
        session.commit()
        return True, None
    except Exception as e:
        session.rollback()
        return False, str(e)
    finally:
        session.close()
def obtener_actividades(limit, offset=0):
    session = SessionLocal()
    try:
        actividades = session.query(Actividad).order_by(Actividad.id.desc()).limit(limit).offset(offset).all()
        
        actividades_data = []
        for actividad in actividades:
            temas = session.query(ActividadTema).filter(ActividadTema.actividad_id == actividad.id).all()
            #print("|||| temas: ")
            #print(temas)
            temas_list = [{"tema": t.tema, "glosa": t.glosa_otro} for t in temas]
            contactos = session.query(ContactarPor).filter(ContactarPor.actividad_id == actividad.id).all()
            contactos_list = [{"nombre": c.nombre, "identificador": c.identificador} for c in contactos]
            #print("|||| contactos: ")
            #print(contactos)
            archivos = session.query(Archivo).filter(Archivo.actividad_id == actividad.id).all()
            archivos_list = [{"nombre": a.nombre_archivo, "ruta": a.ruta_archivo} for a in archivos]
            print("|||| archivos: ")
            print(archivos)
            actividad_json = {
                "id": actividad.id,
                "comuna": actividad.comuna,
                "sector": actividad.sector,
                "nombre": actividad.nombre,
                "email": actividad.email,
                "celular": actividad.celular,
                "dia_hora_inicio": actividad.dia_hora_inicio.isoformat(),
                "dia_hora_termino": actividad.dia_hora_termino.isoformat() if actividad.dia_hora_termino else None,
                "descripcion": actividad.descripcion,
                "temas": temas_list,
                "contactos": contactos_list,
                "archivos": archivos_list
            }
            comentarios = session.query(Comentario).filter(
                Comentario.actividad_id == actividad.id
            ).all()
            actividad_json["comentarios"] = [{
                "nombre": c.nombre,
                "texto": c.texto,
                "fecha": c.fecha.strftime('%Y-%m-%d %H:%M:%S')
            } for c in comentarios]
            actividades_data.append(actividad_json)
        
        return actividades_data
    except Exception as e:
        print(f"Error al obtener actividades: {str(e)}")
        return []
    finally:
        session.close()