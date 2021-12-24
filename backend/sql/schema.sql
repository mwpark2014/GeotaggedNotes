create table if not exists notes (
	note_id bigserial primary key,
	centroid geometry default null,
	hidden boolean default false,
	note_type smallint,
	author int,
	updated_date timestamptz
);

create table if not exists text_notes (
	text_note_id bigserial primary key,
	note_id bigserial,
	text_body text,
	updated_date timestamptz,
	constraint fk_notes
	foreign key(note_id)
	references notes(note_id)
);
