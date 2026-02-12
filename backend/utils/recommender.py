def recommend_schemes(user_details):
    """
    AI-powered scheme recommendations based on user profile
    """
    recommendations = []
    
    # Simple recommendation logic
    age = user_details.get('age', 0)
    income = user_details.get('income', 0)
    occupation = user_details.get('occupation', '')
    state = user_details.get('state', '')
    
    # Educational schemes
    if age < 25:
        recommendations.append({
            'name': 'National Scholarship Portal',
            'reason': 'Based on your age, you may be eligible for various scholarships',
            'priority': 'High'
        })
    
    # Agricultural schemes
    if occupation.lower() == 'farmer':
        recommendations.append({
            'name': 'PM Fasal Bima Yojana',
            'reason': 'Crop insurance scheme for farmers',
            'priority': 'Medium'
        })
    
    # Women-specific schemes
    if user_details.get('gender') == 'female':
        recommendations.append({
            'name': 'PM Ujjwala Yojana',
            'reason': 'Free LPG connections for women from BPL families',
            'priority': 'High'
        })
    
    # State-specific schemes
    if state:
        recommendations.append({
            'name': f'{state} State Government Schemes',
            'reason': f'Schemes specific to {state} state',
            'priority': 'Medium'
        })
    
    return recommendations