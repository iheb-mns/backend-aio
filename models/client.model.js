module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        id: String,
        name: String,
        number: String,
        authNumber: String,
        address: String,
        mobile: String,
        phone: String,
        idCard: String,
        profession: String,
        authDate: String,
        email: String,
        notes: String,
        commercialRegNumber: String,
        taxRegNumber: String,
        companyNumber: String,
        area: String,
        userId: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Client = mongoose.model("client", schema);
    return Client;
  };
  