# Markdown Archive as source of record

Sovereign AI Club meetup notes live first in the Markdown Archive, while Meetup Data is the structured rendering model used by the website and Presentation Mode. This keeps the durable record easy to read, diff, and preserve outside the React app, while still allowing curated data shapes for embeds, slides, calendar metadata, and public Presenter Notes. When Markdown and Meetup Data disagree, treat the Markdown Archive as the source of record and update Meetup Data to render the intended board.
