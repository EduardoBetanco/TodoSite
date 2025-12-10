from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

tasks = []

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)


@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    task_text = data.get('text')
    if task_text:
        tasks.append(task_text)
        return jsonify({'success': True, 'task': task_text})
    return jsonify({'success': False}), 400


@app.route('/tasks/<int:index>', methods=['DELETE'])
def delete_task(index):
    try:
        tasks.pop(index)
        return jsonify({'success': True})
    except IndexError:
        return jsonify({'success': False})


if __name__ == '__main__':
    app.run(debug=True)


@app.route('/')
def index():
    return send_from_directory('.', 'index.html')