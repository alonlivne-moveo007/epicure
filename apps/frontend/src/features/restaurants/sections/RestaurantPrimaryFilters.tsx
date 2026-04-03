'use client';

import styles from './RestaurantPrimaryFilters.module.scss';
import { useState } from 'react';

const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'new', label: 'New' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'open', label: 'Open Now' },
    { id: 'map', label: 'Map View' },
] as const
export type PrimaryFilterId = (typeof FILTERS)[number]['id'];

export function RestaurantPrimaryFilters() {
    const [active, setActive] = useState<PrimaryFilterId>('all');

    return (
        <nav className={styles.nav} aria-label="Restaurant categories">
            <div className={styles.track}>
                {FILTERS.map((f) => {
                    const isActive = active === f.id;
                    return (
                        <button
                            key={f.id}
                            type="button"
                            className={`${styles.item} ${f.id === 'map' ? styles.itemDesktopOnly : ''} button-text ${isActive ? styles.itemActive : ''}`}
                            aria-pressed={isActive}
                            onClick={() => setActive(f.id)}
                        >
                            {f.label}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
