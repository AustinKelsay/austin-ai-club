import { useEffect, useRef } from "react";

function toArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function parseUrl(href) {
  try {
    return new URL(href);
  } catch {
    return null;
  }
}

function getTweetMatch(href) {
  const url = parseUrl(href);
  if (!url) {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  if (host !== "x.com" && host !== "twitter.com") {
    return null;
  }

  const parts = url.pathname.split("/").filter(Boolean);
  const statusIndex = parts.findIndex((part) => part === "status");
  if (statusIndex === -1 || !parts[statusIndex + 1]) {
    return null;
  }

  return {
    author: statusIndex > 0 ? parts[statusIndex - 1] : "i",
    id: parts[statusIndex + 1],
  };
}

function getXArticleMatch(href) {
  const url = parseUrl(href);
  if (!url) {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  if (host !== "x.com" && host !== "twitter.com") {
    return null;
  }

  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] !== "i" || parts[1] !== "article" || !parts[2]) {
    return null;
  }

  return {
    id: parts[2],
    href,
  };
}

function getTweetKey(href) {
  const match = getTweetMatch(href);
  return match ? `tweet:${match.id}` : null;
}

function buildTweetEmbed(href) {
  const match = getTweetMatch(href);
  if (!match) {
    return null;
  }

  return {
    type: "tweet",
    href: `https://twitter.com/${match.author}/status/${match.id}?ref_src=twsrc%5Etfw`,
  };
}

function getYoutubeMatch(href) {
  const url = parseUrl(href);
  if (!url) {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  let videoId = "";

  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    if (url.pathname === "/watch") {
      videoId = url.searchParams.get("v") ?? "";
    } else if (url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/")) {
      videoId = url.pathname.split("/").filter(Boolean)[1] ?? "";
    }
  }

  if (!videoId) {
    return null;
  }

  return { url, videoId };
}

function getVideoKey(href) {
  const match = getYoutubeMatch(href);
  return match ? `youtube:${match.videoId}` : null;
}

function buildYoutubeEmbed(href) {
  const match = getYoutubeMatch(href);
  if (!match) {
    return null;
  }

  const embedUrl = new URL(`https://www.youtube.com/embed/${match.videoId}`);
  for (const [key, value] of match.url.searchParams.entries()) {
    if (key === "v") {
      continue;
    }

    if (key === "t") {
      embedUrl.searchParams.set("start", value);
      continue;
    }

    embedUrl.searchParams.set(key, value);
  }

  return {
    href,
    embedHref: embedUrl.toString(),
    title: "Embedded YouTube video",
    caption: "Video",
  };
}

function getImageKey(href) {
  const url = parseUrl(href);
  if (!url) {
    return null;
  }

  if (!/\.(avif|gif|jpe?g|png|svg|webp)$/i.test(url.pathname)) {
    return null;
  }

  return `image:${url.origin}${url.pathname}`;
}

function buildImageAsset(href) {
  if (!getImageKey(href)) {
    return null;
  }

  return {
    src: href,
    href,
    caption: "Image",
  };
}

function getLinkKey(href) {
  const tweetKey = getTweetKey(href);
  if (tweetKey) {
    return tweetKey;
  }

  const videoKey = getVideoKey(href);
  if (videoKey) {
    return videoKey;
  }

  const imageKey = getImageKey(href);
  if (imageKey) {
    return imageKey;
  }

  const url = parseUrl(href);
  return url ? `${url.origin}${url.pathname}${url.search}` : href;
}

export function getPresentationItemMedia(item) {
  const embeds = [];
  const videos = [];
  const images = [];
  const consumedLinks = new Set();
  const seenEmbeds = new Set();
  const seenVideos = new Set();
  const seenImages = new Set();

  const addEmbed = (embed) => {
    if (!embed?.href) {
      return;
    }

    const key = getTweetKey(embed.href) ?? embed.href;
    if (seenEmbeds.has(key)) {
      return;
    }

    seenEmbeds.add(key);
    embeds.push(embed);
    consumedLinks.add(key);
  };

  const addVideo = (video) => {
    if (!video?.embedHref) {
      return;
    }

    const key = getVideoKey(video.href ?? video.embedHref) ?? video.embedHref;
    if (seenVideos.has(key)) {
      return;
    }

    seenVideos.add(key);
    videos.push(video);
    if (video.href) {
      consumedLinks.add(key);
    }
  };

  const addImage = (image) => {
    if (!image?.src) {
      return;
    }

    const key = getImageKey(image.href ?? image.src) ?? image.src;
    if (seenImages.has(key)) {
      return;
    }

    seenImages.add(key);
    images.push(image);
    if (image.href || image.src) {
      consumedLinks.add(key);
    }
  };

  const presentationImages = item.presentationImages ?? item.images;
  const presentationImage = item.presentationImage ?? item.image;
  // Release roundups always show the full curated feed in Presentation Mode.
  const presentationEmbeds = item.releaseRoundup
    ? item.embeds
    : (item.presentationEmbeds ?? item.embeds);
  const presentationEmbed = item.releaseRoundup
    ? item.embed
    : (item.presentationEmbed ?? item.embed);

  if (!item.suppressImages) {
    [...toArray(presentationImages), ...toArray(presentationImage)].forEach(addImage);
  }

  if (!item.suppressVideos) {
    [...toArray(item.videos), ...toArray(item.video)].forEach(addVideo);
  }

  if (!item.suppressXEmbeds) {
    [...toArray(presentationEmbeds), ...toArray(presentationEmbed)].forEach(addEmbed);
  }

  const presentationLinks = item.releaseRoundup
    ? item.linkPair
    : (item.presentationLinkPair ?? item.linkPair);
  const autoMediaLinks = [item.href, ...toArray(presentationLinks)];

  if (!item.suppressImages) {
    autoMediaLinks.forEach((href) => {
      const image = buildImageAsset(href);
      if (image) {
        addImage(image);
      }
    });
  }

  if (!item.suppressVideos) {
    autoMediaLinks.forEach((href) => {
      const video = buildYoutubeEmbed(href);
      if (video) {
        addVideo(video);
      }
    });
  }

  if (!item.suppressXEmbeds) {
    autoMediaLinks.forEach((href) => {
      const embed = buildTweetEmbed(href);
      if (embed) {
        addEmbed(embed);
      }
    });
  }

  const links = [];
  const seenLinks = new Set();

  for (const href of toArray(presentationLinks)) {
    const key = getLinkKey(href);
    if (consumedLinks.has(key) || seenLinks.has(key)) {
      continue;
    }

    seenLinks.add(key);
    links.push(href);
  }

  const hrefKey = item.href ? getLinkKey(item.href) : null;
  if (
    item.releaseRoundup &&
    item.href &&
    hrefKey &&
    !consumedLinks.has(hrefKey) &&
    !seenLinks.has(hrefKey)
  ) {
    seenLinks.add(hrefKey);
    links.unshift(item.href);
  }

  const showPrimaryLink =
    item.href &&
    !item.releaseRoundup &&
    !presentationLinks &&
    !consumedLinks.has(hrefKey) &&
    !item.mediaPair;

  return {
    embeds,
    videos,
    images,
    links,
    showPrimaryLink,
  };
}

export function TopicEmbed({ embed }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      window.twttr?.widgets?.load?.(containerRef.current);
    }
  }, [embed?.href]);

  if (!embed) {
    return null;
  }

  if (embed.type === "tweet") {
    return (
      <div className="embed-wrap" ref={containerRef}>
        {/* Match the site's single dark palette inside the third-party embed. */}
        <blockquote className="twitter-tweet" data-theme="dark">
          {embed.quote ? (
            <p lang="en" dir="ltr">
              {embed.quote} <a href={embed.href}>link</a>
            </p>
          ) : null}
          {embed.author ? <>- {embed.author} </> : null}
          <a href={embed.href}>
            {embed.date ?? embed.href.replace("?ref_src=twsrc%5Etfw", "")}
          </a>
        </blockquote>
        <span className="embed-caption">
          Embedded post{" "}
          <a href={embed.href} target="_blank" rel="noreferrer">
            open direct
          </a>
        </span>
      </div>
    );
  }

  return null;
}

export function VideoEmbed({ video }) {
  if (!video) {
    return null;
  }

  return (
    <div className="video-embed">
      <div className="video-frame">
        <iframe
          src={video.embedHref}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <span className="video-caption">
        {video.caption}{" "}
        <a href={video.href} target="_blank" rel="noreferrer">
          open direct
        </a>
      </span>
    </div>
  );
}

export function TopicImage({ image }) {
  if (!image?.src) {
    return null;
  }

  const body = (
    <>
      <div className="topic-image-frame">
        <img src={image.src} alt={image.alt ?? image.caption ?? ""} loading="lazy" />
      </div>
      {image.caption ? (
        <span className="topic-image-caption">
          {image.caption}
          {image.href ? " — open direct" : null}
        </span>
      ) : null}
    </>
  );

  if (!image.href) {
    return <div className="topic-image">{body}</div>;
  }

  return (
    <a href={image.href} target="_blank" rel="noreferrer" className="topic-image">
      {body}
    </a>
  );
}

export function TopicArticle({ article }) {
  if (!article?.href) {
    return null;
  }

  const articleLinks =
    article.links?.filter((link) => link?.label && link?.href) ?? [];

  return (
    <article className="article-card">
      {article.image ? (
        <a
          href={article.href}
          target="_blank"
          rel="noreferrer"
          className="article-card-image"
          aria-label={`Open ${article.title ?? "article"}`}
        >
          <img src={article.image} alt="" loading="lazy" />
        </a>
      ) : null}
      <div className="article-card-body">
        <div className="article-card-meta">
          {article.eyebrow ? <span>{article.eyebrow}</span> : null}
          {article.source ? <span>{article.source}</span> : null}
          {article.date ? <span>{article.date}</span> : null}
        </div>
        <a href={article.href} target="_blank" rel="noreferrer" className="article-card-title">
          {article.title ?? article.href}
        </a>
        {article.description ? (
          <p className="article-card-description">{article.description}</p>
        ) : null}
        {articleLinks.length ? (
          <div className="article-card-links">
            {articleLinks.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
        <a href={article.href} target="_blank" rel="noreferrer" className="article-card-action">
          Open article -&gt;
        </a>
      </div>
    </article>
  );
}

export function Topic({ item, id, onActivate, children }) {
  const isInteractive = typeof onActivate === "function";
  const isMainInteractive = isInteractive;
  const className = [
    "topic",
    isInteractive ? "topic--interactive" : "",
    item.topStory ? "topic--top-story" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown = (event) => {
    if (!isInteractive) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate();
    }
  };

  return (
    <li
      id={id}
      className={className}
    >
      <div
        className={["topic-main", isMainInteractive ? "topic-main--interactive" : ""]
          .filter(Boolean)
          .join(" ")}
        role={isMainInteractive ? "button" : undefined}
        tabIndex={isMainInteractive ? 0 : undefined}
        onClick={isMainInteractive ? onActivate : undefined}
        onKeyDown={isMainInteractive ? handleKeyDown : undefined}
      >
        <h4>
          {item.href && !isInteractive ? (
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h4>
        <p>{item.description}</p>
      </div>
      <span className="source-chip">{item.chip}</span>
      {children ? (
        <div
          className="topic-extra"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      ) : null}
    </li>
  );
}

export function parseLinkMeta(href) {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    const path = url.pathname.replace(/\/$/, "");

    if (host === "github.com") {
      const parts = path.split("/").filter(Boolean);
      const owner = parts[0] || "";
      const repo = parts[1] || "";
      return { kind: "github", host, owner, repo, href };
    }

    const xArticle = getXArticleMatch(href);
    if (xArticle) {
      return { kind: "x-article", host, articleId: xArticle.id, href };
    }

    if (host === "x.com" || host === "twitter.com") {
      return { kind: "x", host, path, href };
    }

    if (host === "huggingface.co") {
      const parts = path.split("/").filter(Boolean);
      const owner = parts[0] || "";
      const model = parts[1] || "";
      const isDataset = owner === "datasets";
      return {
        kind: "huggingface",
        host,
        owner: isDataset ? parts[1] || "" : owner,
        model: isDataset ? parts[2] || "" : model,
        type: isDataset ? "Dataset" : "Model",
        href,
      };
    }

    return { kind: "generic", host, path, href };
  } catch {
    return { kind: "generic", host: href, path: "", href };
  }
}

export function LinkCard({ href }) {
  const meta = parseLinkMeta(href);

  if (meta.kind === "github") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="link-card link-card--github">
        <svg className="link-card-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <div className="link-card-body">
          <span className="link-card-domain">github.com</span>
          <span className="link-card-title">{meta.owner}/{meta.repo}</span>
          <span className="link-card-hint">Open repository -&gt;</span>
        </div>
      </a>
    );
  }

  if (meta.kind === "huggingface") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="link-card link-card--huggingface">
        <svg className="link-card-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="4" fill="currentColor" opacity="0.18" />
          <path d="M8 10.5h8M8 14h5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="8" cy="8" r="1.25" fill="currentColor" />
          <circle cx="16" cy="8" r="1.25" fill="currentColor" />
        </svg>
        <div className="link-card-body">
          <span className="link-card-domain">huggingface.co {meta.type}</span>
          <span className="link-card-title">{meta.owner}/{meta.model}</span>
          <span className="link-card-hint">Open model card -&gt;</span>
        </div>
      </a>
    );
  }

  if (meta.kind === "x-article") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="link-card link-card--x link-card--x-article">
        <svg className="link-card-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <div className="link-card-body">
          <span className="link-card-domain">x.com article</span>
          <span className="link-card-title">View article</span>
          <span className="link-card-hint">Open on X -&gt;</span>
        </div>
      </a>
    );
  }

  if (meta.kind === "x") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="link-card link-card--x">
        <svg className="link-card-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <div className="link-card-body">
          <span className="link-card-domain">x.com</span>
          <span className="link-card-title">View post</span>
          <span className="link-card-hint">Open on X -&gt;</span>
        </div>
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="link-card link-card--generic">
      <svg className="link-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      <div className="link-card-body">
        <span className="link-card-domain">{meta.host}</span>
        {meta.path ? <span className="link-card-title">{meta.path}</span> : null}
        <span className="link-card-hint">Open link -&gt;</span>
      </div>
    </a>
  );
}

export function LinkPair({ links }) {
  if (!links?.length) {
    return null;
  }

  return (
    <div className="link-pair">
      {links.map((href) => (
        <LinkCard key={href} href={href} />
      ))}
    </div>
  );
}

function TopicMediaPairItem({ media }) {
  if (!media) {
    return null;
  }

  if (media.type === "tweet") {
    return <TopicEmbed embed={media} />;
  }

  if (media.type === "image") {
    return <TopicImage image={media} />;
  }

  if (media.type === "video") {
    return <VideoEmbed video={media} />;
  }

  if (media.type === "article") {
    return <TopicArticle article={media} />;
  }

  if (media.type === "link") {
    return <LinkCard href={media.href} />;
  }

  return null;
}

/**
 * Renders topic media for Presentation Mode.
 * @param {{ item: object }} props
 * @param {object} props.item Meetup Data topic item
 */
export function TopicMedia({ item }) {
  if (!item) {
    return null;
  }

  if (item.mediaPair) {
    const left = item.mediaPair.left;
    const right = item.mediaPair.right;

    if (left || right) {
      return (
        <>
          <div className="media-pair">
            <TopicMediaPairItem media={left} />
            <TopicMediaPairItem media={right} />
          </div>
          {item.linkPair ? <LinkPair links={item.linkPair} /> : null}
        </>
      );
    }

    return (
      <>
        <div className="media-pair">
          <VideoEmbed video={item.mediaPair.video} />
          <TopicEmbed embed={item.mediaPair.reaction} />
        </div>
        {item.linkPair ? <LinkPair links={item.linkPair} /> : null}
      </>
    );
  }

  const media = getPresentationItemMedia(item);

  if (item.releaseRoundup) {
    return (
      <div className="release-roundup">
        {media.embeds.length ? (
          <section className="release-roundup-section">
            <div className="release-roundup-heading">
              <span className="release-roundup-label">Launch posts</span>
              <span className="release-roundup-count">{media.embeds.length}</span>
            </div>
            <div className="topic-media-stack topic-media-stack--embeds">
              {media.embeds.map((embed) => (
                <TopicEmbed key={embed.href} embed={embed} />
              ))}
            </div>
          </section>
        ) : null}
        {media.videos.length ? (
          <section className="release-roundup-section">
            <div className="release-roundup-heading">
              <span className="release-roundup-label">Videos</span>
              <span className="release-roundup-count">{media.videos.length}</span>
            </div>
            <div className="topic-media-stack topic-media-stack--videos">
              {media.videos.map((video) => (
                <VideoEmbed key={video.href ?? video.embedHref} video={video} />
              ))}
            </div>
          </section>
        ) : null}
        {media.images.length ? (
          <section className="release-roundup-section">
            <div className="release-roundup-heading">
              <span className="release-roundup-label">Images</span>
              <span className="release-roundup-count">{media.images.length}</span>
            </div>
            <div className="topic-media-stack topic-media-stack--images">
              {media.images.map((image) => (
                <TopicImage key={image.href ?? image.src} image={image} />
              ))}
            </div>
          </section>
        ) : null}
        {media.links.length ? (
          <section className="release-roundup-section">
            <div className="release-roundup-heading">
              <span className="release-roundup-label">Sources &amp; artifacts</span>
              <span className="release-roundup-count">{media.links.length}</span>
            </div>
            <div className="link-pair link-pair--roundup">
              {media.links.map((href) => (
                <LinkCard key={href} href={href} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    );
  }

  return (
    <>
      {media.images.length ? (
        <div className="topic-media-stack topic-media-stack--images">
          {media.images.map((image) => (
            <TopicImage key={image.href ?? image.src} image={image} />
          ))}
        </div>
      ) : null}
      {media.videos.length ? (
        <div className="topic-media-stack topic-media-stack--videos">
          {media.videos.map((video) => (
            <VideoEmbed key={video.href ?? video.embedHref} video={video} />
          ))}
        </div>
      ) : null}
      {media.embeds.length ? (
        <div className="topic-media-stack topic-media-stack--embeds">
          {media.embeds.map((embed) => (
            <TopicEmbed key={embed.href} embed={embed} />
          ))}
        </div>
      ) : null}
      {media.links.length ? <LinkPair links={media.links} /> : null}
      {media.showPrimaryLink ? <LinkCard href={item.href} /> : null}
    </>
  );
}
