export { default } from "next-auth/middleware"

export const config = { 
  // Daftarkan folder yang ingin kamu proteksi (hanya admin yang bisa masuk)
  matcher: ["/exry-admin/:path*"] 
}
