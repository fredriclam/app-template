from flask import Flask, render_template
import os
app = Flask(__name__)

@app.route('/resume')
def main():
    message = "hello"
    return render_template("resume.html", message=message)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 33507))
    app.run(debug=True,host='0.0.0.0', port=port)
