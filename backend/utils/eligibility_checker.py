def check_eligibility(user_details):
    """
    Check eligibility for schemes based on user details
    """
    eligible_schemes = []
    
    # Sample eligibility logic
    age = user_details.get('age', 0)
    income = user_details.get('income', 0)
    occupation = user_details.get('occupation', '')
    
    schemes = [
        {
            'name': 'PM Kisan Samman Nidhi',
            'condition': occupation.lower() == 'farmer' and income < 200000,
            'details': 'Eligible for ₹6000/year financial benefit'
        },
        {
            'name': 'Ayushman Bharat',
            'condition': income < 180000,
            'details': 'Eligible for ₹5 lakh health insurance cover'
        },
        {
            'name': 'Sukanya Samriddhi Yojana',
            'condition': user_details.get('has_girl_child') and age < 10,
            'details': 'Eligible for girl child savings scheme'
        },
        {
            'name': 'PM Awas Yojana',
            'condition': income < 600000 and not user_details.get('has_house'),
            'details': 'Eligible for housing subsidy up to ₹2.67 lakh'
        },
        {
            'name': 'PM Mudra Yojana',
            'condition': occupation.lower() in ['business', 'self-employed', 'entrepreneur'],
            'details': 'Eligible for collateral-free business loans'
        }
    ]
    
    for scheme in schemes:
        if scheme['condition']:
            eligible_schemes.append({
                'name': scheme['name'],
                'details': scheme['details']
            })
    
    return eligible_schemes