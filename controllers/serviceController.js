const Service = require("../models/serviceModel");

// ROUTE FUNCTIONS
exports.getAllServices = async (req, res) => {
  try {
    // Filtering:
    const queryObject = { ...req.query };
    const excludedFields = ["sort", "limit", "fields"];
    excludedFields.forEach((element) => delete queryObject[element]);

    // Advanced filtering:
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}` // query rasyti reikia taip: http://localhost:3000/api/v1/hotels?comfort[gte]=5
    );
    // console.log(JSON.parse(queryString));

    let query = Service.find(JSON.parse(queryString));

    // Sorting:
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy); // http://localhost:3000/api/v1/hotels?comfort[gte]=6&sort=-price (su - mazejancia tvarka, be - didejancia)
    } else {
      query = query.sort("-created_at"); // http://localhost:3000/api/v1/hotels?comfort[gte]=6&sort
    }

    // Field limiting:
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields); // http://localhost:3000/api/v1/hotels?fields=name,address rodo tik nurodytus
    }

    // Execute query
    const service = await query;
    res.status(200).json({
      status: "success",
      results: service.length,
      data: {
        service,
      },
    });
    // console.log(hotels);
  } catch (err) {
    console.log(err);
  }
};

exports.createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        service: newService,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("service"); // populate, kad sudeti reviews is duombazes
    if (!service) {
      res.status(404).json({
        status: "failed",
        message: "invalid id",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          service,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// kitam kartui
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        service: "deleted",
      },
    });
  } catch (err) {
    console.log(err);
  }
};