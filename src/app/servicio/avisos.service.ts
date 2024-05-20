import { Injectable } from '@angular/core';
import { Aviso } from '../modelo/avisos';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {


  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db!: SQLiteDBConnection
  plataform: string      = ""
  DB_NAME: string        = "lista_avisos"
  DB_ENCRIPTADA: boolean = false
  DB_MODE: string        = "no-encryption"
  DB_VERSION: number     = 1
  DB_READ_ONLY: boolean  = false
  TABLE_NAME: string     = "lista_avisos"
  DB_SQL_TABLAS: string  = `
  CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME}(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    foto TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    fechaAviso DATE NOT NULL
  );`

  constructor() { }

  private async _iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore()
    }
  }

  async iniciarPlugin() {
    this.plataform = Capacitor.getPlatform()
    if (this.plataform == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)
  }

  

  //CONEXIÓN - SQLITE
  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency()
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
    await this.db.open()
  }

  async agregarAviso(a: Aviso) {
    const sql = `INSERT INTO ${this.TABLE_NAME}(titulo, foto, descripcion,
       fechaAviso) VALUES (?,?,?,DATE('now'))`
    await this.db.run(sql, [a.titulo, a.foto, a.descripcion])
  }

  async mostrarAvisos(): Promise<Aviso[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`
    const resultado = await this.db.query(sql)
    return resultado?.values ?? []
  }

  async borrarAviso(avisosID: number) {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE ID =?`
    await this.db.run(sql, [avisosID])
  }

}
