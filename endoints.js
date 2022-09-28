
rol: 1 = usuario
rol: 2 = hotel
rol: 3 = Alquiler autos 
rol: 4 = Aerolínea

// 1. LOGIN
    request:
        { user: "", pass: "", rol:#rol }
    response:
        // para  un usuario
        { status: true / false, msg:"enviar el error si el status es false", data:{name: "",
        user: "",
        date: "",
        email: "",
        rol:#rol} }
        // para  un servicio tercerizado 
        { status: true / false, msg:"enviar el error si el status es false", data:{name: "",
        country: "",
        city: "",
        email: "",
        rol:#rol} }

// 2. REGISTRO
    request:
        // para  un usuario
        {
            name: "",
            user: "",
            date: "",
            email: "",
            pass: "",
            rol: #rol 
        }
        // para  un servicio tercerizado
        {
            name: "",
            country: "",
            city: "",
            email: "",
            pass: "",
            rol:#rol
        }
    response:
        { status: true / false, msg:"enviar mensaje de error o de exito" }

// 3. DASHBOARD HOTEL 
    request:
        { id_hotel: id_hotel }
    response:
    // lista de habitaciones agregadas 
    data: [
        {
            cantidad_disponible: 1,
            descripcion: "Habitación doble",
            fecha_disponibilidad: "2021-10-10",
            id_habitacion: 1,
            imagen: "../../images/image1.jpg",
            numero: 1,
            precio: 100,
        },
        {
            cantidad_disponible: 1,
            descripcion: "Habitación doble",
            fecha_disponibilidad: "2021-10-10",
            id_habitacion: 1,
            imagen: "../../images/image1.jpg",
            numero: 1,
            precio: 100,
        }
    ]

// 4. AGREGAR HABITACION
    request:
        { 
        numero:3,
        cantidad_disponible:2,
        precio: 50,
        fecha_disponibilidad: "2021-10-10",
        descripcion: "esto es una descripcion",
        hotel_id: 1,
        imagen: file
        }
    response:
        { 
            status: true / false,
            msg:"enviar mensaje de error o de exito" 
        }

// 5. ELIMINAR HABITACION
    request:
        { id_habitacion: id_habitacion }
    response:
        { 
            status: true / false,
            msg:"enviar mensaje de error o de exito" 
        }



// 6. DASHBOARD ALQUILER AUTOS
    request:
        { id_alquiler: id_alquiler }
    response:
        // lista de autos agregados
        data: [
            {
                marca:"toyota",
                placa: "1234",
                modelo: "yaris",
                precio:100,
                rental_id: 1,
                imagen: "../../images/image1.jpg",
                estado: "Disponible",
                id_auto: 1
            },
            {
                marca:"toyota",
                placa: "1234",
                modelo: "yaris",
                precio:100,
                rental_id: 1,
                imagen: "../../images/image1.jpg",
                estado: "No Disponible",
                id_auto: 1
            }
        ]

// 7. AGREGAR AUTO
    request:
        {
            marca: "",
            placa: "",
            modelo: "",
            precio: "",
            rental_id: "",
            imagen: file
        }
    response:
        { 
            status: true / false,
            msg:"enviar mensaje de error o de exito" 
        }

// 8. ELIMINAR AUTO
    request:
        { id_auto: id_auto }
    response:
        { 
            status: true / false,
            msg:"enviar mensaje de error o de exito" 
        }

// 9. DASHBOARD AEROLINEA
    request:
        { id_aerolinea: id_aerolinea }
    response:
        // lista de vuelos agregados
        data: [
            {
                vuelo_id: 1,
                id_aerolinea: 1,
                cantidad_disponible: 100,
                destino_vuelo: "Bogota",
                fecha_vuelo: "2021-10-10",
                imagen: "../../images/image1.jpg",
                precio: 100000,
                tipo_vuelo: "Ida"
            },
            {
                vuelo_id: 1,
                id_aerolinea: 1,
                cantidad_disponible: 100,
                destino_vuelo: "Bogota",
                fecha_vuelo: "2021-10-10",
                imagen: "../../images/image1.jpg",
                precio: 100000,
                tipo_vuelo: "Ida"
            }
        ]

// 10. AGREGAR VUELO
    request:
        {
            fecha_vuelo: "",
            destino_vuelo: "",
            cantidad_disponible: "",
            precio: "",
            tipo_vuelo: "",
            aerolinea_id: "",
            imagen:file
        }
    response:
        { 
            status: true / false,
            msg:"enviar mensaje de error o de exito" 
        }

// 11. ELIMINAR VUELO
    request:
        { id_vuelo: id_vuelo }
    response:
        { 
            status: true / false,
            msg:"enviar mensaje de error o de exito" 
        }

