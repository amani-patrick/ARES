from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task
def execute_attack(attack_type):
    # Execute a long-running attack task
    return f"Attack {attack_type} executed"
