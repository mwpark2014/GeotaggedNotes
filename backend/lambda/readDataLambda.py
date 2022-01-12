import psycopg2
import rds_config

NOTES_QUERY_LIMIT = 100

def lambda_handler(event, context):

	dbName = rds_config.db_name
	username = rds_config.db_username
	password = rds_config.db_password
	hostName = rds_config.db_host

	connectionString = "dbname={} user={} password={} host={}".format(dbName, username, password, hostName)

	conn = psycopg2.connect(connectionString)
	cur = conn.cursor()

	cur.execute("""
		SELECT note_id from notes
		order by centroid <-> ST_SetSRID(ST_Point(%s, %s),4326)
		limit %s
		""",
		(event['lng'],  event['lat'], NOTES_QUERY_LIMIT)
	)
	ids = cur.fetchall()

	noteIds = []

	for note in ids:
		noteId = note[0]
		noteIds.append(noteId)


	noteTuple = tuple(noteIds)

	cur.execute("""
		SELECT * from text_notes
		where note_id in %s
		""",
		(noteTuple,)
	)

	return {
		"result": cur.fetchall()
	}