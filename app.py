from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# Home page
@app.route('/')
def home():
    return render_template('index.html')

# Serve certificate files from static/certificates/
@app.route('/certificates/<filename>')
def certificate(filename):
    cert_folder = os.path.join(app.root_path, 'static', 'certificates')
    return send_from_directory(cert_folder, filename)

# Download resume
@app.route('/resume')
def resume():
    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        'resume.pdf',
        as_attachment=True
    )
application = app

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
