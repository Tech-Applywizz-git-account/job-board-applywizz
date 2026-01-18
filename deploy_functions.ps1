# Deploy Script for Supabase Edge Functions

Write-Host "🚀 Starting Deployment..." -ForegroundColor Green

# Check if supabase is installed
if (-not (Get-Command "supabase" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Supabase CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g supabase
}

# Login (will skip if already logged in, or prompt if needed)
Write-Host "🔑 checking login..." -ForegroundColor Cyan
supabase login

# Link Project
# Replace with your project ref
$PROJECT_REF = "njpraxyykyggxbcseixq"
Write-Host "🔗 Linking project $PROJECT_REF..." -ForegroundColor Cyan
supabase link --project-ref $PROJECT_REF

# Deploy Functions
Write-Host "🔥 Deploying functions..." -ForegroundColor Cyan

$functions = @(
    "paypal-create-dubai",
    "paypal-create-india",
    "paypal-capture",
    "stripe-create-dubai",
    "stripe-create-india",
    "stripe-capture",
    "send-payment-email"
)

foreach ($func in $functions) {
    Write-Host "   Deploying $func..."
    supabase functions deploy $func --no-verify-jwt
}

Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "⚠️  IMPORTANT: Make sure you have set your secrets in Supabase Dashboard!" -ForegroundColor Yellow
