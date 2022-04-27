import "./ContributionsWall.css"

import React, { useContext } from "react"
import { ContributionsContext } from "src/helpers/contexts/ContributionsContext"

import { ContributionCard } from "./ContributionCard"

export default function ContributionsWall() {
  const { contributions } = useContext(ContributionsContext)

  return (
    <div className="container w-full mx-auto my-32">
      <h2
        id="contributions"
        className="font-title text-6xl font-bold text-center"
      >
        Visions of a Regenerative Future
      </h2>
      {contributions?.length ? (
        <div className="my-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {contributions.map((contribution, index) => (
            <ContributionCard
              key={contribution.id}
              contribution={contribution}
              className={`mx-auto ${index === 0 ? "highlight" : ""}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

const MOCK = [
  {
    id: 1,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 2,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 3,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 4,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 5,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 6,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 7,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 8,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 9,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 10,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 12,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 13,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 14,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 15,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 16,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 17,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 18,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 19,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 20,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 21,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
  {
    id: 22,
    authorId: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
    signature:
      "0x8c1f1f619453acd2def8d585da7917add222866ba51d6025fa21fb8e1741be742b350f292792e5a85a43edb3670241c2546b2cc6c9f46abb6032abb9a918be131b",
    createdAt: new Date("2022-04-26T15:18:28.556Z"),
    sense: "LooksLike",
    prompt: "Children",
    response:
      "When I imagine the world I am proud to leave my children, it looks like serendipity",
    priority: 0,
    author: {
      id: "0x5716e900249D6c35afA41343a2394C32C1B4E6cB",
      twitter: "cyrusofeden",
      country: "",
      createdAt: new Date("2022-04-26T15:18:21.240Z"),
    },
  },
]
