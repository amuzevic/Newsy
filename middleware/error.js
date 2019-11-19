module.exports = function(err, req, res, next){
  switch(err.name) {
    case "CastError": return res.status(400).send("Invalid data provided");
    default: return res.status(500).send("Unexpected error occured");
  }
}