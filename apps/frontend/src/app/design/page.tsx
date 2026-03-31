/**
 * Design System / Style Guide — dev-only route at `/design`.
 * Shows all typography classes, color tokens, reusable components, and layout primitives
 * from the real global styles so visual regressions are immediately obvious.
 */

import { ChefCard } from '@/components/cards/ChefCard/ChefCard';
import { DishCard } from '@/components/cards/DishCard/DishCard';
import { RestaurantCard } from '@/components/cards/RestaurantCard/RestaurantCard';
import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';

import styles from './page.module.scss';

// ─── Mock data ────────────────────────────────────────────────────────────────
const RESTAURANT_CARDS = [
  { name: 'Taizu', subtitle: 'Asian Fusion · Tel Aviv', rating: 4 },
  { name: 'The Dining Room', subtitle: 'Contemporary · Jerusalem', rating: 5 },
  { name: 'Claro', subtitle: 'Mediterranean · Tel Aviv', rating: 3 },
];

const DISH_CARDS = [
  { name: 'Truffle Risotto', description: 'Arborio rice, black truffle, parmesan', price: 89, seed: 'dish1' },
  { name: 'Salmon Tartare', description: 'Fresh Atlantic salmon, avocado, citrus', price: 72, seed: 'dish2' },
  { name: 'Lava Cake', description: 'Dark chocolate, vanilla ice cream', price: 48, seed: 'dish3' },
];

const CHEF_CARDS = [
  { name: 'Eyal Shani', seed: 'chef1' },
  { name: 'Assaf Granit', seed: 'chef2' },
  { name: 'Yonatan Roshfeld', seed: 'chef3' },
];

const COLOR_TOKENS = [
  { name: 'Black', variable: '--color-black', value: '#000000', bg: 'var(--color-black)', light: true },
  { name: 'Gray', variable: '--color-gray', value: '#979797', bg: 'var(--color-gray)', light: true },
  { name: 'Cream', variable: '--color-cream', value: '#f9f4ea', bg: 'var(--color-cream)', light: false },
  { name: 'Gold', variable: '--color-gold', value: '#e19d1a', bg: 'var(--color-gold)', light: true },
  { name: 'White Off', variable: '--color-white-off', value: '#fafafa', bg: 'var(--color-white-off)', light: false },
  { name: 'White', variable: '--color-white', value: '#ffffff', bg: 'var(--color-white)', light: false },
  { name: 'Gray Light', variable: '--color-gray-light', value: '#f2f2f2', bg: 'var(--color-gray-light)', light: false },
];

const SPACING_TOKENS = [
  { name: '--spacing-sm', value: '16px', px: 16 },
  { name: '--spacing-lg', value: '48px', px: 48 },
  { name: '--grid-gap', value: '24px', px: 24 },
  { name: '--section-padding-top', value: '40px', px: 40 },
  { name: '--container-padding-mobile', value: '20px', px: 20 },
  { name: '--container-padding-desktop', value: '128px', px: 128 },
];

export const metadata = {
  title: 'Design System — Epicure',
};

export default function DesignSystemPage() {
  return (
    <div className={styles.page}>
      {/* ─── Page header ─────────────────────────────────────────────── */}
      <div className={styles.pageHeader}>
        <p className={styles.pageTitle}>Design System</p>
        <p className={styles.pageSubtitle}>
          Typography · Colors · Components · Layout · Dev-only route at{' '}
          <code>/design</code>
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. TYPOGRAPHY                                                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className={styles.section}>
        <p className={styles.sectionHeading}>01 — Typography</p>
        <div className={styles.typoRow}>

          <div className={styles.typoItem}>
            <span className={styles.typoMeta}>.h1 / &lt;h1&gt;</span>
            <div className={styles.typoSample}>
              <h1>The Art of Fine Dining</h1>
            </div>
            <span className={styles.typoSizes}>
              Mobile 24px · Desktop 32px · weight 100
            </span>
          </div>

          <div className={styles.typoItem}>
            <span className={styles.typoMeta}>.h2 / &lt;h2&gt;</span>
            <div className={styles.typoSample}>
              <h2>Featured Restaurants</h2>
            </div>
            <span className={styles.typoSizes}>
              Mobile 16px · Desktop 30px · weight 100
            </span>
          </div>

          <div className={styles.typoItem}>
            <span className={styles.typoMeta}>.h3 / &lt;h3&gt;</span>
            <div className={styles.typoSample}>
              <h3>Chef&apos;s Special</h3>
            </div>
            <span className={styles.typoSizes}>
              Mobile 18px · Desktop 40px · weight 400
            </span>
          </div>

          <div className={styles.typoItem}>
            <span className={styles.typoMeta}>.body</span>
            <div className={styles.typoSample}>
              <p className="body">
                Epicure connects you with the finest dining experiences in Israel.
                Discover award-winning restaurants, talented chefs and unique dishes.
              </p>
            </div>
            <span className={styles.typoSizes}>
              Mobile 16px · Desktop 24px · weight 100
            </span>
          </div>

          <div className={styles.typoItem}>
            <span className={styles.typoMeta}>.button-text</span>
            <div className={styles.typoSample}>
              <p className="button-text">View Menu · Contact Us · Book a Table</p>
            </div>
            <span className={styles.typoSizes}>
              16px (all breakpoints) · weight 100
            </span>
          </div>

          <div className={styles.typoItem}>
            <span className={styles.typoMeta}>.input-text</span>
            <div className={styles.typoSample}>
              <p className="input-text">Search for restaurant or cuisine...</p>
            </div>
            <span className={styles.typoSizes}>
              16px (all breakpoints) · weight 100
            </span>
          </div>

          <div className={styles.typoItem}>
            <span className={styles.typoMeta}>.label</span>
            <div className={styles.typoSample}>
              <p className="label">Price Range · Cuisine Type · Distance</p>
            </div>
            <span className={styles.typoSizes}>
              14px (all breakpoints) · weight 100
            </span>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. COLOR TOKENS                                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className={styles.section}>
        <p className={styles.sectionHeading}>02 — Color Tokens</p>
        <div className={styles.colorGrid}>
          {COLOR_TOKENS.map((token) => (
            <div key={token.variable} className={styles.colorSwatch}>
              <div
                className={styles.colorBox}
                style={{ background: token.bg }}
              />
              <span className={styles.colorName}>{token.name}</span>
              <span className={styles.colorValue}>{token.variable}</span>
              <span className={styles.colorValue}>{token.value}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3. COMPONENTS — Restaurant Cards                               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className={styles.section}>
        <p className={styles.sectionHeading}>03a — RestaurantCard</p>
        <div className={styles.cardsGrid}>
          {RESTAURANT_CARDS.map((card, i) => (
            <RestaurantCard
              key={card.name}
              name={card.name}
              subtitle={card.subtitle}
              rating={card.rating}
              imageUrl={`https://picsum.photos/seed/restaurant${i}/400/260`}
            />
          ))}
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <p className={styles.typoMeta} style={{ marginBottom: '0.75rem' }}>Without image</p>
          <div className={styles.cardsGrid} style={{ maxWidth: '260px' }}>
            <RestaurantCard name="Messa" subtitle="Modern Israeli · Tel Aviv" rating={4} />
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3b. Dish Cards                                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className={`${styles.section} ${styles.sectionAlt}`}>
        <p className={styles.sectionHeading}>03b — DishCard</p>
        <div className={styles.cardsGrid}>
          {DISH_CARDS.map((dish) => (
            <DishCard
              key={dish.name}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              imageUrl={`https://picsum.photos/seed/${dish.seed}/400/260`}
            />
          ))}
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <p className={styles.typoMeta} style={{ marginBottom: '0.75rem' }}>Without image</p>
          <div className={styles.cardsGrid} style={{ maxWidth: '260px' }}>
            <DishCard name="Shakshuka" description="Eggs in spiced tomato sauce" price={52} />
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3c. Chef Cards                                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className={styles.section}>
        <p className={styles.sectionHeading}>03c — ChefCard</p>
        <div className={styles.cardsGridWide}>
          {CHEF_CARDS.map((chef) => (
            <ChefCard
              key={chef.name}
              name={chef.name}
              imageUrl={`https://picsum.photos/seed/${chef.seed}/433/338`}
            />
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 4. UI ELEMENTS — Buttons, Tags, Inputs                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className={`${styles.section} ${styles.sectionAlt}`}>
        <p className={styles.sectionHeading}>04a — Buttons</p>
        <div className={styles.uiRow}>
          <div className={styles.uiGroup}>
            <span className={styles.uiLabel}>Primary</span>
            <button type="button" className={styles.btnPrimary}>
              View Menu
            </button>
          </div>
          <div className={styles.uiGroup}>
            <span className={styles.uiLabel}>Secondary / Outlined</span>
            <button type="button" className={styles.btnSecondary}>
              Learn More
            </button>
          </div>
          <div className={styles.uiGroup}>
            <span className={styles.uiLabel}>Gold / Accent</span>
            <button type="button" className={styles.btnGold}>
              Book a Table
            </button>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <p className={styles.sectionHeading}>04b — Tag Chips</p>
        <div className={styles.uiRow}>
          {['All', 'Pasta', 'Vegan', 'Sushi', 'Meat', 'Desserts', 'Breakfast'].map(
            (tag, i) => (
              <span
                key={tag}
                className={`${styles.tagChip} ${i === 0 ? styles.tagChipActive : ''}`}
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={`${styles.section} ${styles.sectionAlt}`}>
        <p className={styles.sectionHeading}>04c — Search Input</p>
        <div className={styles.uiRow}>
          <div className={styles.uiGroup}>
            <span className={styles.uiLabel}>Search (filled state)</span>
            <div className={styles.searchInput}>
              <svg
                className={styles.searchIcon}
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M14 14l3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="input-text">Pasta</span>
            </div>
          </div>
          <div className={styles.uiGroup}>
            <span className={styles.uiLabel}>Search (placeholder state)</span>
            <div className={styles.searchInput}>
              <svg
                className={styles.searchIcon}
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M14 14l3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="input-text">Search for restaurant or cuisine...</span>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 5. LAYOUT                                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className={styles.section}>
        <p className={styles.sectionHeading}>05a — Spacing Tokens</p>
        <div className={styles.spacingList}>
          {SPACING_TOKENS.map((token) => (
            <div key={token.name} className={styles.spacingRow}>
              <div
                className={styles.spacingBar}
                style={{ width: Math.min(token.px, 128) }}
              />
              <span className={styles.spacingLabel}>
                {token.name} = {token.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={`${styles.section} ${styles.sectionAlt}`}>
        <p className={styles.sectionHeading}>05b — Grid (3-column, gap 24px)</p>
        <div className={styles.cardsGrid}>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={styles.layoutBox}
              style={{ height: 80 }}
            >
              column {i + 1}
              <br />
              <span style={{ fontSize: '0.65rem' }}>min 240px</span>
            </div>
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <p className={styles.sectionHeading}>05c — SectionWrapper</p>
        <div className={styles.sectionWrapperDemo}>
          <div className={styles.sectionWrapperLabel}>SectionWrapper — max-width 1440px · padding mobile 20px / desktop 128px</div>
          <SectionWrapper
            title="Section Title (h2)"
            titleId="design-section-demo"
            footer={
              <button type="button" className={styles.btnSecondary}>
                See All
              </button>
            }
          >
            <div className={styles.cardsGrid}>
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className={styles.layoutBox} style={{ height: 64 }}>
                  content slot {i + 1}
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 6. LIVE SECTION WRAPPER (real component in context)             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionWrapper title="Live Section — Restaurants" titleId="design-live-section">
        <div className={styles.cardsGrid}>
          {RESTAURANT_CARDS.map((card, i) => (
            <RestaurantCard
              key={card.name}
              name={card.name}
              subtitle={card.subtitle}
              rating={card.rating}
              imageUrl={`https://picsum.photos/seed/live${i}/400/260`}
            />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
