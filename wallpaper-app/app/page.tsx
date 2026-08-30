   import { supabase } from './supabaseClient'

export default async function Home() {
  const { data: wallpapers, error } = await supabase
    .from('wallpapers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Wallpaper Website
      </h1>

      {error && <p>Error loading wallpapers: {error.message}</p>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {wallpapers && wallpapers.map((wallpaper) => (
          <div key={wallpaper.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <img
              src={wallpaper.thumbnail_url}
              alt={wallpaper.title}
              style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '10px' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{wallpaper.title}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{wallpaper.category}</p>
            </div>
          </div>
        ))}
      </div>

      {(!wallpapers || wallpapers.length === 0) && (
        <p style={{ textAlign: 'center' }}>No wallpapers found.</p>
      )}
    </main>
  )
}
