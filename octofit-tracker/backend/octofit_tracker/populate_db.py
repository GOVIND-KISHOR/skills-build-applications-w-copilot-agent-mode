
import os
import django
import datetime

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')
django.setup()

from .models import User, Team, Activity, Workout, Leaderboard

def populate():
    # Create a user
    user, created = User.objects.get_or_create(username='testuser')
    if created:
        user.set_password('testpass')
        user.save()
    print(f"User: {user.username}")

    # Create a team and add user
    team, _ = Team.objects.get_or_create(name='Test Team')
    team.members.add(user)
    print(f"Team: {team.name}")

    # Create an activity
    activity, _ = Activity.objects.get_or_create(
        user=user,
        activity_type='run',
        duration=30,
        calories_burned=200,
        date=datetime.date(2024, 1, 1)
    )
    print(f"Activity: {activity.activity_type}")

    # Create a workout
    workout, _ = Workout.objects.get_or_create(
        user=user,
        name='Morning Workout',
        description='Pushups',
        date=datetime.date(2024, 1, 1)
    )
    print(f"Workout: {workout.name}")

    # Create a leaderboard
    leaderboard, _ = Leaderboard.objects.get_or_create(
        team=team,
        total_points=100
    )
    print(f"Leaderboard for team: {leaderboard.team.name}")

if __name__ == "__main__":
    populate()
