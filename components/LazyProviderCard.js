import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function LazyProviderCard({ provider, onBookNow, viewProfileBtn, bookNowBtn, unavailableBtn, providerCardStyle, cardHeaderStyle, profileImageStyle, verifiedBadgeStyle, providerInfoStyle, providerNameStyle, serviceStyle, ratingStyle, starsStyle, ratingValueStyle, descriptionStyle, statsGridStyle, statStyle, statIconStyle, statLabelStyle, priceAndActionStyle, priceLabel, priceValueStyle, actionButtonsStyle }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.unobserve(ref.current)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!isVisible) {
    return <div ref={ref} style={{ height: '300px', background: '#f5f5f5', borderRadius: '14px' }} />
  }

  return (
    <div ref={ref} style={providerCardStyle}>
      <div style={cardHeaderStyle}>
        <div style={profileImageStyle}>
          {provider.image}
          {provider.verified && <span style={verifiedBadgeStyle}>✓</span>}
        </div>
        <div style={providerInfoStyle}>
          <h3 style={providerNameStyle}>{provider.name}</h3>
          <p style={serviceStyle}>{provider.service}</p>
          <div style={ratingStyle}>
            <span style={starsStyle}>{'⭐'.repeat(Math.floor(provider.rating))}</span>
            <span style={ratingValueStyle}>{provider.rating} ({provider.reviews})</span>
          </div>
        </div>
      </div>

      <div style={descriptionStyle}>
        {provider.description}
      </div>

      <div style={statsGridStyle}>
        <div style={statStyle}>
          <span style={statIconStyle}>🎯</span>
          <div>
            <p style={statLabelStyle}>{provider.jobs} Jobs</p>
          </div>
        </div>
        <div style={statStyle}>
          <span style={statIconStyle}>⏱️</span>
          <div>
            <p style={statLabelStyle}>{provider.responseTime}</p>
          </div>
        </div>
        <div style={statStyle}>
          <span style={statIconStyle}>👤</span>
          <div>
            <p style={statLabelStyle}>{provider.experience}y exp</p>
          </div>
        </div>
      </div>

      <div style={priceAndActionStyle}>
        <div>
          <p style={priceLabel}>Starting from</p>
          <p style={priceValueStyle}>₹{provider.price}</p>
        </div>
        <div style={actionButtonsStyle}>
          <Link href={`/provider/${provider.id}`} style={viewProfileBtn}>
            View Profile
          </Link>
          {provider.available ? (
            <button
              style={bookNowBtn}
              onClick={() => onBookNow(provider)}
            >
              Book Now
            </button>
          ) : (
            <button style={unavailableBtn} disabled>Unavailable</button>
          )}
        </div>
      </div>
    </div>
  )
}
