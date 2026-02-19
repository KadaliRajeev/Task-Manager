from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# Task Model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)



# BASIC ROUTE
@app.route("/")
def home():
    return {"message": "Task Manager API is running with CRUD + AI"}


# CRUD ROUTES

@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.json

    if not data or "title" not in data:
        return jsonify({"error": "Title is required"}), 400

    new_task = Task(title=data["title"])
    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Task created"}), 201


@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()

    return jsonify([
        {
            "id": task.id,
            "title": task.title,
            "completed": task.completed
        }
        for task in tasks
    ])


@app.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    task = Task.query.get_or_404(id)
    task.completed = not task.completed
    db.session.commit()

    return jsonify({"message": "Task updated"})


@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"})


# ENHANCED MOCK AI ROUTE

@app.route("/generate-description", methods=["POST"])
def generate_description():
    data = request.json

    if not data or "title" not in data:
        return jsonify({"error": "Title is required"}), 400

    title = data["title"]

    templates = [

        f"Break '{title}' into manageable milestones and set deadlines for each stage. Track your progress daily to stay consistent.",

        f"Stay committed while working on '{title}'. Focus, discipline, and consistent effort will lead you to success.",

        f"Approach '{title}' strategically. Define clear objectives, create an action plan, and evaluate your progress weekly.",

        f"Dedicate focused time blocks to '{title}'. Eliminate distractions and measure outcomes after each session.",

        f"Treat '{title}' as a growth opportunity. Learn from challenges and continuously refine your approach.",

        f"Plan, execute, and review your progress while completing '{title}'. Consistency is key.",

        f"To complete '{title}', research thoroughly, outline steps clearly, allocate time efficiently, and monitor improvements regularly."
    ]

    description = random.choice(templates)

    return jsonify({"description": description})


# RUN SERVER
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
