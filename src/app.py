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
        
        # TODO: Implement AI recommendation logic here
        # For now, return sample data
        recommendations = get_sample_recommendations(search_data)
        
        return jsonify({
            'status': 'success',
            'recommendations': recommendations,
            'total_count': len(recommendations)
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/accommodation/<int:accommodation_id>')
def accommodation_details(accommodation_id):
    """Get detailed information about a specific accommodation"""
    # TODO: Fetch from database
    accommodation = get_accommodation_by_id(accommodation_id)
    return render_template('accommodation_details.html', accommodation=accommodation)

@app.route('/api/chat', methods=['POST'])
def chat_response():
    """Handle chatbot messages"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        # TODO: Implement AI chatbot logic
        bot_response = generate_bot_response(user_message)
        
        return jsonify({
            'status': 'success',
            'response': bot_response
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

def get_sample_recommendations(search_data):
    """Generate sample recommendations based on search criteria"""
    # Sample data - in production, this would use AI/ML algorithms
    accommodations = [
        {
            'id': 1,
            'name': 'VUT Main Campus Residence',
            'type': 'Campus Residence',
            'price': 4200,
            'location': 'On Main Campus',
            'distance': 'Direct campus access',
            'rating': 4.8,
            'reviews': 124,
            'image': 'vut_main_res.jpg',
            'features': ['Campus Wi-Fi', '24/7 Security', 'Study Areas'],
            'ai_match': 95
        },
        {
            'id': 2,
            'name': 'VUT Vanderbijlpark Amberfield Residence',
            'type': 'Campus Residence',
            'price': 3800,
            'location': 'Vanderbijlpark Campus',
            'distance': '5 min to classes',
            'rating': 4.5,
            'reviews': 98,
            'image': 'amberfield.jpg',
            'features': ['Meal Plan', 'Entertainment', 'Social Events'],
            'ai_match': 88
        },
        {
            'id': 3,
            'name': 'VUT Bedworth Lake Residence',
            'type': 'Campus Residence',
            'price': 3200,
            'location': 'Main Campus',
            'distance': 'Shuttle to campus',
            'rating': 4.6,
            'reviews': 87,
            'image': 'bedworth_lake.jpg',
            'features': ['Gym', 'Laundry', 'Parking'],
            'ai_match': 82
        }
    ]
    
    # Filter based on search criteria
    filtered_accommodations = []
    
    for acc in accommodations:
        # Apply budget filter
        budget = int(search_data.get('budget', 10000))
        if acc['price'] <= budget:
            filtered_accommodations.append(acc)
    
    # Sort by AI match score
    filtered_accommodations.sort(key=lambda x: x['ai_match'], reverse=True)
    
    return filtered_accommodations

def get_accommodation_by_id(accommodation_id):
    """Get detailed information for a specific accommodation"""
    # Sample data - in production, fetch from database
    accommodations = {
        1: {
            'id': 1,
            'name': 'VUT Main Campus Residence',
            'description': 'Modern on-campus accommodation with all essential amenities.',
            'price': 4200,
            'location': 'On Main Campus',
            'address': 'VUT Main Campus, Vanderbijlpark',
            'amenities': ['Wi-Fi', 'Security', 'Study Areas', 'Laundry', 'Dining Hall'],
            'images': ['vut_main_res.jpg'],
            'contact': {
                'phone': '+27 16 950 9000',
                'email': 'accommodation@vut.ac.za'
            }
        }
    }
    
    return accommodations.get(accommodation_id, {})

def generate_bot_response(user_message):
    """Generate chatbot response based on user input"""
    message = user_message.lower()
    
    responses = {
        'greeting': "Hello! I'm here to help you find the perfect VUT accommodation.",
        'budget': "VUT accommodations typically range from R2,000 to R10,000 per month. What's your budget?",
        'location': "VUT has campuses in Vanderbijlpark, Secunda, and Upington. Which campus interests you?",
        'amenities': "Popular amenities include Wi-Fi, security, study areas, and laundry facilities.",
        'application': "I can guide you through the application process. Would you like information about campus residences?",
        'default': "I can help you find accommodations, compare options, or answer questions about VUT housing."
    }
    
    if any(word in message for word in ['hello', 'hi', 'hey']):
        return responses['greeting']
    elif any(word in message for word in ['budget', 'cost', 'price']):
        return responses['budget']
    elif any(word in message for word in ['location', 'campus', 'where']):
        return responses['location']
    elif any(word in message for word in ['amenities', 'facilities', 'features']):
        return responses['amenities']
    elif any(word in message for word in ['apply', 'application', 'register']):
        return responses['application']
    else:
        return responses['default']

if __name__ == '__main__':
    # Create directories if they don't exist
    os.makedirs('../static/css', exist_ok=True)
    os.makedirs('../static/js', exist_ok=True)
    os.makedirs('../static/images', exist_ok=True)
    os.makedirs('../templates', exist_ok=True)
    
    # Run the app
    app.run(debug=True, host='0.0.0.0', port=5000)