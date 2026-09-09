# Sovereign AI Club rebrand with the Brand Poster as design guide

Austin AI Club is renamed Sovereign AI Club as of September 2026. The rename applies everywhere the club is named: UI copy, page titles and metadata, Meetup Data, calendar and reminder artifacts, the Markdown Archive, LLM Wiki page titles and `[[wikilinks]]`, tests, and docs. Past Meetup pages are renamed too, so the archive reads as one club with one name rather than a club that changed names mid-history. The trade-off is historical accuracy in page titles for a consistent identity across every surface an agent or reader can land on; this ADR records the former name so that trade-off stays legible.

The original rebrand deferred the domain migration. In the separate September 9, 2026 domain update, `sovereignai.club` becomes the primary address and `austinai.club` remains attached to the same site, redirecting visitors to the corresponding path on the new domain. Site and reminder URLs use the new domain. ICS event UIDs retain `@austinai.club` because changing an event identifier can create duplicate calendar entries. The GitHub repo and package name remain `austin-ai-club`.

Event Metadata is excluded from the rename: past Meetups keep the venue and time they actually had. The new venue (AI Freedom Lab, Austin, TX) and 5:30 PM start apply from the next Meetup, the Meetup template, and later generated Meetup Slots.

"Sovereign" is also an editorial commitment. The Sovereignty Lens becomes the club's primary lens for Discussion Fit, with the existing Open Source Lens and Privacy Lens as facets of it. It is not a Track.

The Sovereign AI Club poster at `docs/brand/sovereign-ai-club-poster.jpg` is the de facto design guide for the website. Concretely: the poster's sage, wireframe green, monospace family, ASCII-art wordmark, brutalist panels with hard offset shadows, and repeating ASCII wallpaper. The site ships as a single dark theme (sage and green on charcoal) with no light-mode option: that palette still reads as the poster, and one theme keeps archive pages, wiki, and Presentation Mode on the same identity.

The September 9 poster revision places “SOVEREIGN AI” on one banner. The brand reference, homepage image and social sharing image use the supplied artwork unchanged. Public image URLs include a content version so browsers and sharing services can fetch the revision.
