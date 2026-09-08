import { COMMUNITY_SLOT_LABEL } from "../../app/constants.js";

export const submissionScreens = {
  link: {
    kind: "link",
    title: "Submit a link",
    description: null,
    fields: [
      {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Short label for the link",
        required: true,
      },
      {
        name: "urls",
        label: "Links",
        type: "textarea",
        placeholder: "https://example.com\nhttps://example.com/another-link",
        required: true,
        rows: 4,
      },
    ],
  },
  showcase: {
    kind: "showcase",
    title: `Propose a ${COMMUNITY_SLOT_LABEL.toLowerCase()}`,
    description: "A 3-5 minute demo, build, or discussion.",
    fields: [
      {
        name: "title",
        label: "Topic title",
        type: "text",
        placeholder: "What you want to talk about",
        required: true,
      },
      {
        name: "description",
        label: "What you want to cover",
        type: "textarea",
        placeholder: "What do you want to demo or discuss?",
        required: true,
        rows: 6,
      },
    ],
  },
};
