type Business = {
  id: string
  name: string
  description: string | null
  cover_image: string | null
}

export default function BusinessHero({ business }: { business: Business }) {

  return (

    <div>

      {business.cover_image && (

        <div
          style={{
            width: "100%",
            height: 220,
            overflow: "hidden"
          }}
        >
          <img
            src={business.cover_image}
            alt={business.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>

      )}

      <div style={{ padding: 20 }}>

        <h1 style={{ fontSize: 28, fontWeight: 700 }}>
          {business.name}
        </h1>

        {business.description && (
          <p style={{ color: "#555", marginTop: 8 }}>
            {business.description}
          </p>
        )}

      </div>

    </div>

  )

}