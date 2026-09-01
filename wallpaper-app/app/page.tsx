import { supabase } from './supabaseClient'

export default async function Home() {
  const { data: wallpapers, error } = await supabase.from('wallpapers').select('*').order('created_at', { ascending: false })

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Wallpaper Website</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Free wallpapers for your phone and desktop</p>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error.message}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {wallpapers && wallpapers.map((wallpaper) => (
          <div key={wallpaper.id} style={{ border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff' }}>
            <img src={wallpaper.thumbnail_url} alt={wallpaper.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
            <div style={{ padding: '14px' }}>
              <h3 style={{ margin: '0 0 4px 0' }}>{wallpaper.title}</h3>
              <p style={{ margin: '0 0 12px 0', color: '#888' }}>{wallpaper.category}</p>
              <a href={wallpaper.image_url} download target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#000', color: '#fff', padding: '10px', borderRadius: '8px', textDecoration: 'none' }}>Download</a>
            </div>
          </div>
        ))}
      </div>
      {(!wallpapers || wallpapers.length === 0) && <p style={{ textAlign: 'center', marginTop: '50px' }}>No wallpapers found.</p>}
    </main>
  )
}
