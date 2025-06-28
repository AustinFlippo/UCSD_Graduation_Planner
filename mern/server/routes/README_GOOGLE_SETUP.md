# Google Sheets API Setup

## Service Account Details
- **Project ID**: `ucsd-planner-463920`
- **Service Account File**: `ucsd-planner-463920-0b8bad5f9948.json`

## Local Development Setup

1. Download the service account JSON file from Google Cloud Console
2. Save it as `ucsd-planner-463920-0b8bad5f9948.json` in this directory (`mern/server/routes/`)
3. Make sure the file is in `.gitignore` (already configured)

### File Structure:
```
mern/server/routes/
├── ucsd-planner-463920-0b8bad5f9948.json # Your actual service account file (gitignored)
└── README_GOOGLE_SETUP.md                # This file
```

## Render Production Setup

1. Go to your Render dashboard
2. Navigate to your Express backend service
3. Go to "Environment" → "Secret Files"
4. Upload your service account JSON file with the filename: `ucsd-planner-463920-0b8bad5f9948.json`
5. The file will be mounted at: `/etc/secrets/ucsd-planner-463920-0b8bad5f9948.json`

## Required Permissions

The service account needs these Google API scopes:
- `https://www.googleapis.com/auth/spreadsheets`
- `https://www.googleapis.com/auth/drive`

## Testing

Test the Google Sheets integration:

### Health Check:
```bash
curl http://localhost:5050/api/export/health
```

### Export Test:
```bash
curl -X POST http://localhost:5050/api/export/google-sheets \
  -H "Content-Type: application/json" \
  -d '{
    "schedule": [{"fall": [], "winter": [], "spring": []}],
    "yearLabels": ["2024-2025"],
    "studentName": "Test Student"
  }'
```

## Troubleshooting

1. **"Google API not initialized"**: Check that `test_key.json` exists and is valid
2. **"Authentication failed"**: Verify the service account has proper permissions
3. **"Quota exceeded"**: You've hit Google API limits, wait or increase quota
4. **"Insufficient permissions"**: The service account needs Sheets and Drive access

## Environment Variables (Alternative)

Instead of using a file, you can set the entire JSON as an environment variable:

```bash
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"ucsd-planner-463920",...}'
```