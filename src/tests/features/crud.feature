# language: es
Característica: CRUD

  Yo como PO
  quiero probar operaciones de regresion en la API
  para validar su funcionalidad despues de cambios implementados

  Escenario: CRUD exitoso en API Store
    Dado que tengo acceso al endPoint de la API
    Cuando realice un CRUD con el id 9 y el estado 'available'
    Entonces se validara que todas las operaciones fueron exitosas