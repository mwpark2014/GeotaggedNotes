import psycopg2
import argparse
import rds_config
from datetime import datetime

def writeToDB(lat, lng, body):
	dbName = rds_config.db_name
	username = rds_config.db_username
	password = rds_config.db_password
	hostName = rds_config.db_host

	connectionString = "dbname={} user={} password={} host={}".format(dbName, username, password, hostName)
	print("Connecting with these credentials: " + connectionString)

	conn = psycopg2.connect(connectionString)
	cur = conn.cursor()

	
	# first insert into the note db

	currentTime = datetime.now()
	currentTimeStamp = currentTime.isoformat()

	print("About to insert into notes db")
	
	cur.execute("""
		INSERT INTO notes (centroid, note_type, author, updated_date) 
		values (ST_SetSRID(ST_MakePoint(%s, %s), 4326), %s, %s, %s) 
		RETURNING note_id""",
		(lng, lat, 1, 1, currentTimeStamp)
	)

	noteId = cur.fetchone()[0]

	# then insert into the text_note db

	print("About to insert into text_notes db")

	cur.execute("""
		INSERT INTO text_notes (note_id, text_body, updated_date)
		values (%s, %s, %s)
		""",
		(noteId, body, currentTimeStamp)
	)

	conn.commit()
	cur.close()
	conn.close()

if __name__ == "__main__":
	parser = argparse.ArgumentParser(
		description="Add a note to the db",
		formatter_class=argparse.RawDescriptionHelpFormatter,
	)

	parser.add_argument(
		"-l",
		"--lat",
		type=float,
		help="latitude to place note",
	)

	parser.add_argument(
		"-g",
		"--lng",
		type=float,
		help="longitude to place note",
	)

	parser.add_argument(
		"-b",
		"--body",
		type=str,
		help="Body of note to save",
	)

	args = parser.parse_args()

	writeToDB(args.lat, args.lng, args.body)