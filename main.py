from website import create_app, models

app = create_app()

if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000) #serve globally
    app.run(port=5000,debug=True) 
