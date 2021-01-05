from flask.cli import AppGroup
from .seeds import seed_all, undo_all

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    # Add seed functions here
    seed_all()
# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_all()
