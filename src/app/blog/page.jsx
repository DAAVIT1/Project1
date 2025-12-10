import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import Image from "next/image";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3600}});

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const BlogPage = async () => {

  // FETCH DATA WITH AN API
  let posts = [];
  try {
    posts = await getData();
  } catch (e) {
    posts = [];
  }

  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();

  return (
    <div className={styles.wrapper}>
      <section className={styles.intro}>
        <div className={styles.introText}>
          <p className={styles.kicker}>Digital Stories</p>
          <h1 className={styles.heading}>Blog — Inspiration & Tips</h1>
          <p className={styles.copy}>
            We collect the backstage lessons from projects: from ideas and design
            to coding standards and productivity tips. Find something new,
            try it, and share back with us.
          </p>
          <div className={styles.points}>
            <span>• What worked in our recent projects</span>
            <span>• UI/UX moves that keep users engaged</span>
            <span>• Tech we’re trialing in the next sprint</span>
          </div>
        </div>
        <div className={styles.introMedia}>
          <div className={styles.pulse} />
          <Image
            src="/hero.gif"
            alt="Creative flow animation"
            fill
            className={styles.introImg}
            priority
          />
        </div>
      </section>

      <section className={styles.info}>
        <div className={styles.infoBlock}>
          <h3>Product Growth</h3>
          <p>
            After shipping simple features we layer small experiments (A/B tests,
            microcopy, visible CTAs) to quickly see what sticks. Consistent notes
            show each small iteration lifts metrics by 3–7%.
          </p>
        </div>
        <div className={styles.infoBlock}>
          <h3>Choosing the Stack</h3>
          <p>
            In the last sprint we used Next.js with Server Actions to simplify forms.
            Caching + ISR cut latency and boosted SEO, while aligned design tokens
            reduced UI debt.
          </p>
        </div>
        <div className={styles.infoBlock}>
          <h3>Team Process</h3>
          <p>
            Kanban plus short dailies keep everyone aligned. In retros we pick
            just 1–2 action items and check them the next sprint. Result: less
            context switching and fewer unnecessary meetings.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        {posts.map((post, idx) => (
          <div
            className={styles.post}
            key={post.id}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <PostCard post={post} />
          </div>
        ))}
        {!posts.length && (
          <div className={styles.fallback}>
            <div className={styles.fallbackCard}>
              <p className={styles.kicker}>Case Study</p>
              <h4>Rebrand Sprint in 10 Days</h4>
              <p className={styles.fallbackText}>
                Cleaned a startup’s visual system, added design tokens, and aligned
                naming from design to code for smoother handoff.
              </p>
            </div>
            <div className={styles.fallbackCard}>
              <p className={styles.kicker}>Process</p>
              <h4>Design → Dev Handoff</h4>
              <p className={styles.fallbackText}>
                Figma components + Storybook previews ensure devs match spacing
                and colors. Outcome: fewer QA cycles.
              </p>
            </div>
            <div className={styles.fallbackCard}>
              <p className={styles.kicker}>Tech</p>
              <h4>Performance Checklist</h4>
              <p className={styles.fallbackText}>
                To hit Lighthouse 90+, we lean on ISR, image lazy-load, and
                bundle-splitting. Small steps, big wins for SEO.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
