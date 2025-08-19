from flask import Flask, render_template, request, jsonify
import os

# Create Flask app
app = Flask(__name__, 
           template_folder='../templates',
           static_folder='../static')

# Configure app
app.config['SECRET_KEY'] = 'vut-accommodation-ai-secret-key-2024'

@app.route('/')
def index():
    """Main page route"""
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """Dashboard page route"""
    return render_template('dashboard.html')

@app.route('/search', methods=['POST'])
def search_accommodations():
    """Handle accommodation search requests"""
    try:
        # Get form data
        search_data = {
            'campus': request.form.get('campus'),
            'accommodation_type': request.form.get('accommodation-type'),
            'budget': request.form.get('budget'),
            'room_type': request.form.get('room_type'),
            'safety_priority': request.form.get('safety_priority'),
            'distance_priority': request.form.get('distance_priority'),
            'amenities': request.form.getlist('amenities')
        }
        
        # TODO: Implement your accommodation search logic here
        
        return jsonify({
            'status': 'success',
            'message': 'Search functionality to be implemented',
            'search_criteria': search_data
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f"Search error: {str(e)}"
        }), 500

@app.route('/accommodation/<int:accommodation_id>')
def accommodation_details(accommodation_id):
    """Get detailed information about a specific accommodation"""
    # TODO: Implement accommodation details logic here
    return render_template('accommodation_details.html', 
                         accommodation={'id': accommodation_id, 'name': 'Sample Accommodation'})

if __name__ == '__main__':
    # Create directories if they don't exist
    os.makedirs('../static/css', exist_ok=True)
    os.makedirs('../static/js', exist_ok=True)
    os.makedirs('../static/images', exist_ok=True)
    os.makedirs('../templates', exist_ok=True)
    
    # Run the app
    app.run(debug=True, host='0.0.0.0', port=5000)