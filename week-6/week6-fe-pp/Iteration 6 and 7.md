# Iteration 6

## Login Logic: Model vs Controller

In Iterations 1–5, we used `userSchema.statics.login` and `signup` to encapsulate authentication logic within the model. This allowed us to call `User.login(email, password)` from the controller, keeping validation and password hashing close to the data layer.

In the final version, all logic was moved into the controller, making the model passive and the controller responsible for validation, querying, and hashing.

We chose to use the model-driven approach for our project because it promotes separation of concerns, cleaner controllers, and better reusability. It also makes testing and scaling easier as the application grows.

We use `this.findOne({ email })` inside model statics to refer to the model context, and `bcrypt` is imported in the model where password logic resides.

This design choice reflects our commitment to maintainable, modular architecture.

# Iteration 7

### Signup Logic: Model vs Controller

In Iteration 7, the signup logic including validation, hashing, and user creation was handled directly in the controller. While this works, it leads to bloated controllers and tightly couples business logic to route handling.

In Iterations 1–5, we used `userSchema.statics.signup` to encapsulate this logic inside the model. This allowed us to call `User.signup(email, password)` from the controller, keeping the controller clean and focused.

We prefer the model-driven approach because it promotes separation of concerns, improves reusability, and makes testing easier. It also aligns with scalable architecture practices.

We use `this.create(...)` inside model statics to refer to the model context, and `validator` is imported in the model to keep validation centralized.

This design choice reflects our commitment to clean, maintainable backend architecture.

