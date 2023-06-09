const express = require("express");
const { Property } = require("../models");
const { Op } = require("sequelize");
const propertyRouter = express.Router();

//crear una propiedad
propertyRouter.post("/add", (req, res) => {
  Property.create(req.body).then((property) => {
    res.status(201).send(property);
  });
});

//traer todas las propiedades
propertyRouter.get("/", (req, res) => {
  Property.findAll()
    .then((property) => res.json(property))
    .catch((err) => res.send(err));
});

//traer una sola propiedad
propertyRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Property.findOne({ where: { id } })
    .then((property) => {
      res.send(property);
    })
    .catch((err) => res.send(err));
});
//ruta para editar una propiedad

propertyRouter.patch("/update/:id", (req, res) => {
  //campos que se pueden llegar a actualizar
  const { id } = req.params;
  const inputs = [
    "title",
    "address",
    "city",
    "state",
    "country",
    "description",
    "price",
    "image",
    "rooms",
    "area",
    "bedroom",
    "bathroom",
    "condition",
    "type",
  ];
  const inputsUpdate = {};
  //atrapar datos que se pueden actualizar
  inputs.forEach((campo) => {
    if (req.body[campo]) {
      inputsUpdate[campo] = req.body[campo];
    }
  });
  //hacer el cambio
  Property.findOne({ where: { id } }).then((property) => {
    property
      .update(inputsUpdate)
      .then(() => {
        res
          .status(200)
          .json({ message: "Propiedad actualizada correctamente" });
      })
      .catch((err) => console.log(err));
  });
});

//ruta para eliminar una propiedad
propertyRouter.delete("/delete/:id", (req, res) => {
  Property.findByPk(req.params.id).then((property) => {
    property.destroy().then(() => res.sendStatus(204));
  });
});

// ruta para buscar alquiler/venta
propertyRouter.get("/condition/:condition", (req, res) => {
  Property.findAll({
    where: {
      condition: { [Op.iLike]: `%${req.params.condition}%` },
    },
  })
    .then((property) => res.json(property))
    .catch((err) => res.send(err));
});
// buscar por ubicacion
//ciudad

propertyRouter.get("/ubication/:city", (req, res) => {
  Property.findAll({
    where: {
      city: { [Op.iLike]: `%${req.params.city}%` },
    },
  })
    .then((property) => res.json(property))
    .catch((err) => res.send(err));
});

//provincia
propertyRouter.get("/state/:state", (req, res) => {
  Property.findAll({
    where: {
      state: { [Op.iLike]: `%${req.params.state}%` },
    },
  })
    .then((property) => res.json(property))
    .catch((err) => res.send(err));
});
//pais
propertyRouter.get("/country/:country", (req, res) => {
  Property.findAll({
    where: {
      country: { [Op.iLike]: `%${req.params.country}%` },
    },
  })
    .then((property) => res.json(property))
    .catch((err) => res.send(err));
});

// ruta por tipo de propiedad(departamento. ph, casa, terreno o local) CATEGORIA

propertyRouter.get("/type/:type", (req, res) => {
  Property.findAll({
    where: {
      type: {
        [Op.iLike]: `%${req.params.type}%`,
      },
    },
  })
    .then((property) => res.json(property))
    .catch((err) => res.send(err));
});

//ruta para búsqueda por precio

propertyRouter.get("/price/:price", (req, res) => {
  Property.findAll({
    where: {
      price: req.params.price,
    },
  })
    .then((property) => res.send(property))
    .catch((err) => res.send(err));
});

//ruta para buscar por cantidad de ambientes

propertyRouter.get("/rooms/:rooms", (req, res) => {
  Property.findAll({
    where: {
      rooms: req.params.rooms,
    },
  })
    .then((property) => res.send(property))
    .catch((err) => res.send(err));
});

propertyRouter.get("/buscar/:palabra", (req, res) => {
  Property.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.params.palabra}%`,
          },
        },
        {
          address: {
            [Op.iLike]: `%${req.params.palabra}%`,
          },
        },
        {
          city: {
            [Op.iLike]: `%${req.params.palabra}%`,
          },
        },
        {
          state: {
            [Op.iLike]: `%${req.params.palabra}%`,
          },
        },
        {
          country: {
            [Op.iLike]: `%${req.params.palabra}%`,
          },
        },
        {
          description: {
            [Op.iLike]: `%${req.params.palabra}%`,
          },
        },
        {
          condition: {
            [Op.iLike]: `%${req.params.palabra}%`,
          },
        },
        {
          type: {
            [Op.iLike]: `%${req.params.palabra}%`,
          },
        },
      ],
    },
  })
    .then((propiedades) => {
      res.json(propiedades);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Hubo un error en el servidor");
    });
});


///// ruta para editar solamente el ranking  ////

propertyRouter.patch('/:id', (req, res) => {
  console.log("ENTRÉ A LA RUTA DEL RANKING DEL BACK Y EL REQ.BODY ES:", req.body);
  const { id } = req.params;
  const { ranking } = req.body;
  
  Property.findByPk(id)
    .then(property => {
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      property.ranking = ranking;
      return property.save();
    })
    .then(property => {
      res.json(property);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    });
});

///// ruta para editar solamente los reviews  ////

propertyRouter.patch('/review/:id', (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  
  console.log("ENTRÉ A LA RUTA DEL REVIEW DEL BACK Y EL REQ.BODY ES:", req.body);

  Property.findByPk(id)
    .then(property => {
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      property.review = review;
      return property.save();
    })
    .then(property => {
      res.json(property);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    });
});

module.exports = propertyRouter;
