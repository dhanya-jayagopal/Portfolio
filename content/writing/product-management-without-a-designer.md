---
slug: product-management-without-a-designer
date: October 2026
minutes: 8
title: Product management without a designer
tag: Essays
excerpt: Bomisco has no designer, and our prototype and product were built in different ways. I used the redesign as an experiment in how far Claude Code could take it with minimal engineering time. Here's what I tried, what I noticed and what I learned.
---

Bomisco doesn't have a designer. I'm the founding Product Manager, so design work lands on me. For most of this year I built clickable prototypes with V0, an AI prototyping tool, and handed them to engineering as the spec.

## The problem

The prototype was built with Tailwind CSS and shadcn/ui components, while the actual product used Material UI components, two very different-looking design languages. The functionality and interaction patterns were similar, but the styling of the standard parts every product uses, like the buttons, tables, forms and pop-ups, looked different. Every screen I designed in the prototype was really a picture, and engineering had to rebuild it from scratch using Material UI. Details got lost in translation.

The product also had its own version of the problem. Our component library had only a few ready-made parts, so engineers converting each prototype design into Material UI often had to fill the gaps themselves. Each solution made sense on its own screen, but over time they drifted apart. A small summary box, for example, looked slightly different from one page to the next. Nobody set out to make it inconsistent.

So the problem was the two big gaps. My designs couldn't be built as drawn, and the product didn't have one consistent look to design against.

## The approach

The product was growing and taking on more use cases, and each one added screens. A consistent design language reduces cognitive load. Once users learn how a table, filter or pop-up works, they can use it the same way everywhere. Without one, every new screen made the product harder to learn.

Historically, redesign projects are time-intensive efforts with little immediate customer impact. So I treated this problem as an experiment. I wanted to learn how much of this Claude Code could take on, so the redesign would use as little engineering time as possible. Our engineers had a roadmap to build. The real question was how much of the design side a PM working with AI could handle without pulling engineers off it.

To make the prototype and the product look, feel and work the same, I saw two approaches.

The first was a paint job. Restyle the prototype so it looked more like the product: same colours, same fonts, same spacing. Quick to do, and the screenshots would look right. But engineering would still rebuild every screen from a picture, so the handoff problem would stay where it was.

The second was to rebuild the prototype from the product's real building blocks. If the prototype was built with those same parts as the actual product, a screen I designed wouldn't be a picture any more. It would be a working version made of the same pieces engineering uses, so they could follow it closely instead of starting over. Slower up front, but it fixes the handoff for every screen after it.

I picked the second mainly because a one-time effort leads to faster development later. The eventual goal is for developers to pick up the prototype's screens, hook them up to the back end, review and deploy.

To do this, the plan had three steps. Bring the product's building blocks into the prototype. Go through every screen in the product and note where it had drifted from them. Then rebuild every prototype screen on them.

The split was simple. Claude Code built each screen, ran it in a browser, tested it and showed me. I set the design rules, reviewed every screen and made the calls. It took two weeks.

None of this went straight into production. The prototype is the reference, and engineering builds it into the product.

Here's what I noticed along the way, and what we changed.

## The prototype was ahead of the product

Halfway through, I reviewed a batch of rebuilt screens and sent most of them back. Claude Code had rebuilt them by following the product, which seemed like a sensible reference. But on some screens the prototype had moved ahead. I'd iterated on those flows with end users in mind, and the product hadn't caught up yet.

That's how it's meant to work: the prototype leads and the product follows. Quietly matching the prototype to the product meant losing ideas that hadn't been built yet.

So we added a step. Whenever the prototype and the product handled a user flow differently, Claude Code flagged it for me to review instead of picking one. Those flags led to some of the most useful conversations in the project, because each one was a product decision hiding inside a design task.

## The building blocks grew as we went

The product's set of building blocks turned out to be minimal. As Claude Code rebuilt each prototype screen, it kept finding things the existing parts couldn't do. Sometimes that meant a new part. More often, an existing part needed a small extension.

The summary box is a good example. The product had several versions of it, each built for one screen. Instead of adding another, we kept one and gave it a few optional extras: a coloured edge, a click-through to the page behind the number, and a small menu. Screens across the prototype now use that one.

To keep those calls honest, I had Claude Code build a single page that shows every building block in the library, with examples. Whenever a screen seemed to need something new, we checked that page first. Could an existing part do the job with a small extension, or did we need something new? Seeing everything side by side made that an easy call, and it kept near-duplicates from creeping back in.

We also watched for repeated widgets. When the same thing showed up in more than one place, like sending an email, it became a shared part instead of being rebuilt each time.

By the end, the library had grown from a minimal set into a complete one, shaped by what the screens needed. Every new screen started from the same parts, and that brought a lot of consistency. The new parts and extensions went into the handoff too, for engineering to bring into the product.

## Rules worked best when they were built in

A designer carries dozens of small rules in their head and applies them as second nature. Without one, I had to say them out loud. Every page's name in the menu matches its title. Buttons always look like buttons. Sending an email looks the same wherever you do it.

Writing the rules down helped. Building them into the shared parts helped more. Once the email widget existed, there was only one way to send an email, so nobody had to remember the rule. By the end, the easiest way to build a screen was also the consistent way.

## Consistency could be measured

A designer notices when a title sits a few pixels lower on one page than another. I wasn't sure I'd catch that every time, and an AI doesn't look at a screen the way a person does.

So we tried measuring it. Claude Code wrote a check that opens the main pages one by one and compares fonts, spacing, where the title sits and whether everything fits. Alongside it, each screen got its own tests as it was built, clicking through the screen the way a user would and checking it did what it should.

The tests grew with the product. When a review turned up something new, it became a check. After I asked for tables to fit inside their cards, the consistency check started measuring that on every page it opens. When I decided every page's web address should match its title, a test started walking every link in the menu to confirm it. When a screen gained features, its tests grew too: one screen's checks more than doubled when we added new ways to review changes and pick which ones to apply. The consistency check grew as screens were rebuilt.

Before every review, Claude Code ran the whole set again, not just the tests for the screen that changed. That's what made it safe to move fast. If a change on one screen broke another, the next run caught it before I did. By the end there were 29 sets of tests plus the consistency check, and they went to engineering with the handoff, along with notes on reusing them against the product.

That changed how I spent my review time. The pixel-level checks ran on their own, so I could focus on what can't be measured: does this flow make sense for the person using it?

## Evidence made everything easier to trust

Near the end, Claude Code wrote up the handoff for engineering as a set of tickets. When we checked them against the prototype, a few described things a little differently from how they worked. The pattern was interesting: claims checked against the code held up, and the ones written from memory were the ones that drifted.

So we made checking part of the routine. Every specific claim in a document points to where it came from. Anything not yet checked is labelled that way. Every document gets a fact-check before it goes out. Where we could, we generated documents from one source instead of writing the same facts in several places, so they couldn't disagree.

The same habit helped with status. In a fast, two-week project, lots of documents say what's done. Updating all of them after each change, not just one, kept everyone working from the same picture.

## The redesign doubled as an audit

This one was a bonus. Rebuilding every screen on the product's real parts meant looking closely at how each screen was built. That turned up 45 findings: parts built more than once, dead code and some bugs. That's normal for a product that grew fast. The useful part was finding them ourselves, so they can be fixed before customers run into them. I'd never have found time for that audit on its own. It came with the design work, and every finding went to engineering with the handoff.

## What I learned

- **Tell the AI which source wins, and have it flag the rest.** Claude Code sensibly followed the product, and that quietly erased prototype ideas the product hadn't caught up to. AI will pick a reference for you if you don't. Name the source of truth up front, and ask for disagreements to be raised rather than resolved, because they're usually product decisions in disguise.
- **Prototype with production's parts, or you're handing over pictures.** Restyling makes the screenshots match but leaves engineering rebuilding every screen. If your prototype can't use the components engineering ships, close that gap first, and every screen after it gets cheaper.
- **Put taste in components, not documents.** Without a designer, a style guide is something people forget to read, but one email widget means there's only one way to send an email. When you write a design rule, ask what shared part would make breaking it the harder path, and extend an existing part before adding a new one.
- **Turn every review comment into a check.** Once you've said "tables should fit their cards", a test should say it from then on. AI builds faster than you can review, so your attention is the real constraint. Automating the measurable things means your review time goes to whether the flow makes sense.

The experiment answered the question I started with. In two weeks we had a working reference for every screen and a handoff engineering could pick up, without pulling engineers off the roadmap. A designer would have caught a lot of this earlier, from experience. Without one, working with AI still got us a consistent design language and a complete set of building blocks, and building them was easier than I expected. The experiment didn't cover everything a designer does; it was about consistency.

While the core of a product manager's job, deciding what matters to our users and what to build, stayed with me, this exercise changed what I think a PM can take on. With AI, I could do more of the PM-adjacent work with ease, like keeping the design consistent and building a prototype engineering can build from.
