from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        # Djongo workaround: delete non-superuser users one by one
        for user in User.objects.all():
            if not user.is_superuser:
                user.delete()

        # Create users (superheroes)
        marvel_heroes = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'first_name': 'Tony', 'last_name': 'Stark'},
            {'username': 'captainamerica', 'email': 'cap@marvel.com', 'first_name': 'Steve', 'last_name': 'Rogers'},
            {'username': 'spiderman', 'email': 'spidey@marvel.com', 'first_name': 'Peter', 'last_name': 'Parker'},
        ]
        dc_heroes = [
            {'username': 'batman', 'email': 'batman@dc.com', 'first_name': 'Bruce', 'last_name': 'Wayne'},
            {'username': 'superman', 'email': 'superman@dc.com', 'first_name': 'Clark', 'last_name': 'Kent'},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'first_name': 'Diana', 'last_name': 'Prince'},
        ]
        marvel_users = [User.objects.create_user(**hero, password='password') for hero in marvel_heroes]
        dc_users = [User.objects.create_user(**hero, password='password') for hero in dc_heroes]

        # Create teams
        marvel_team = Team.objects.create(name='Marvel')
        marvel_team.members.set(marvel_users)
        dc_team = Team.objects.create(name='DC')
        dc_team.members.set(dc_users)

        # Create activities
        for user in marvel_users + dc_users:
            Activity.objects.create(
                user=user,
                activity_type='Running',
                duration=30,
                calories_burned=300,
                date=timezone.now().date()
            )
            Activity.objects.create(
                user=user,
                activity_type='Cycling',
                duration=45,
                calories_burned=400,
                date=timezone.now().date()
            )

        # Create workouts
        for user in marvel_users + dc_users:
            Workout.objects.create(
                user=user,
                name='Morning Workout',
                description='Pushups, Situps, Squats',
                date=timezone.now().date()
            )

        # Create leaderboards
        Leaderboard.objects.create(team=marvel_team, total_points=1000)
        Leaderboard.objects.create(team=dc_team, total_points=900)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
