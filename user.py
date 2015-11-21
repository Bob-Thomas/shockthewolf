from random import Random


def User(userID, username, screen_dimensions):
    random = Random()
    return {
        'screen_dimensions': screen_dimensions,
        'username': username,
        'id': userID,
        'position': [random.randint(0, screen_dimensions[0]), random.randint(0, screen_dimensions[1])],
        'size': [10, 10],
        'color': 'rgb(' + str(random.randint(1, 255)) + ',' + str(random.randint(1, 255)) + ',' + str(random.randint(1, 255)) + ')',
        'speed': [random.randint(0, 10), random.randint(0, 10)],
        'shape': "ball"
    }
