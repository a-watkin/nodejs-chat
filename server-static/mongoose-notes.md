Schemas not only define the structure of your document and casting of properties, they also define document instance methods, static Model methods, compound indexes, and document lifecycle hooks called middleware.

^ i need to undersand the above better


## Model

Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.


## Instance methods - you can define triggers here it seems for example on saving this do that and maybe more?

Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods.



## Schema relating to a model

// Schema maps to db collection (collection has many models)
var userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Model
var User = mongoose.model('User', userSchema);

// Instance of a model
var user = new User({name: "A", password: "test"})


