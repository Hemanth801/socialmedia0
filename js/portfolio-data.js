/**
 * portfolio-data.js
 * Data store for Lokarapu Hemanth's Portfolio
 * Realistic Case Studies, Sample Datasets & Verified Client Reviews
 */

const PortfolioData = {
  // 1. Before & After Comparison Scenarios
  comparisonScenarios: {
    bank_statement: {
      title: "Bank Statement to Excel",
      before: {
        type: "raw_pdf",
        meta: "HDFC_BUSINESS_STATEMENT_OCT.PDF (Scanned OCR / Misaligned Columns)",
        lines: [
          "28/09/25   UPI/5291882910/STRIPE PAYOUTS      ₹48,200.00    ₹1,84,291.00",
          "01/10/25   POS 88921 AMZN RETAIL TECH         -₹3,480.00    ₹1,80,811.00",
          "03/10/25   NEFT/N09182918/TECHCORP SERVICES   -₹55,000.00   ₹1,25,811.00",
          "07/10/25   ACH DEBIT GOOGLE CLOUD INFRA       -₹1,245.00    ₹1,24,566.00",
          "12/10/25   CHQ PAID #1042 OFFICE RENT         -₹12,500.00   ₹1,12,066.00",
          "18/10/25   RTGS/INVC#8820 CLIENT PAYMENT      ₹1,24,000.00  ₹2,36,066.00",
          "24/10/25   SALARY DISBURSEMENT OCT            -₹68,200.00   ₹1,67,866.00",
          "30/10/25   MONTHLY CHARGES WAIVED             ₹0.00         ₹1,67,866.00"
        ]
      },
      after: {
        headers: ["Tx Date", "Description", "Category", "Debit (-)", "Credit (+)", "Closing Balance"],
        rows: [
          ["28-09-2025", "Stripe Payout ACH", "Online Revenue", "₹0.00", "₹48,200.00", "₹1,84,291.00"],
          ["01-10-2025", "Amazon Office Supplies", "Supplies", "₹3,480.00", "₹0.00", "₹1,80,811.00"],
          ["03-10-2025", "TechCorp Vendor Payout", "Contractors", "₹55,000.00", "₹0.00", "₹1,25,811.00"],
          ["07-10-2025", "Google Cloud Infrastructure", "SaaS & Hosting", "₹1,245.00", "₹0.00", "₹1,24,566.00"],
          ["12-10-2025", "Office Rent Check #1042", "Facilities", "₹12,500.00", "₹0.00", "₹1,12,066.00"],
          ["18-10-2025", "Client Project Retainer", "Client Revenue", "₹0.00", "₹1,24,000.00", "₹2,36,066.00"],
          ["24-10-2025", "Team Monthly Payroll", "Salaries", "₹68,200.00", "₹0.00", "₹1,67,866.00"],
          ["30-10-2025", "Account Maintenance Fee", "Bank Charges", "₹0.00", "₹0.00", "₹1,67,866.00"]
        ],
        total: ["TOTALS", "", "", "₹1,40,425.00", "₹1,72,200.00", "NET: +₹31,775.00"]
      }
    },

    invoice_ocr: {
      title: "Scanned Invoices & GST Bills",
      before: {
        type: "raw_pdf",
        meta: "GST_TAX_INVOICE_SCAN_8891.PDF (Skewed 4°, Noisy Background)",
        lines: [
          "ITEM: 001   Dell UltraSharp 27 4K Monitor    QTY: 4   @ ₹38,500ea   TOTAL: 154000.00",
          "ITEM: 002   Ergonomic Mesh Chair V2          QTY: 8   @ ₹14,200ea   TOTAL: 113600.00",
          "ITEM: 003   Logitech MX Master 3S Wireless   QTY: 6   @ ₹8,999ea    TOTAL: 53994.00",
          "ITEM: 004   USB-C Multiport Thunderbolt Hub  QTY: 10  @ ₹6,450ea    TOTAL: 64500.00",
          "SUBTOTAL: ₹3,86,094.00   |   GST (18%): ₹69,496.92   |   FREIGHT: ₹4,500.00   |   DUE: ₹4,60,090.92"
        ]
      },
      after: {
        headers: ["HSN/SKU", "Item Description", "Unit Price", "Qty", "Taxable Amt", "GST (18%)"],
        rows: [
          ["8471-MON-27", "Dell UltraSharp 27 4K Monitor", "₹38,500.00", "4", "₹1,54,000.00", "₹27,720.00"],
          ["9403-CHR-02", "Ergonomic Mesh Office Chair", "₹14,200.00", "8", "₹1,13,600.00", "₹20,448.00"],
          ["8471-ACC-3S", "Logitech MX Master 3S Mouse", "₹8,999.00", "6", "₹53,994.00", "₹9,718.92"],
          ["8471-HUB-TB", "USB-C Multiport Thunderbolt Hub", "₹6,450.00", "10", "₹64,500.00", "₹11,610.00"],
          ["9965-SHP-01", "Standard Freight & Handling", "₹4,500.00", "1", "₹4,500.00", "₹0.00 (Exempt)"]
        ],
        total: ["GRAND TOTAL", "", "", "29 Units", "₹3,90,594.00", "₹4,60,090.92 (Reconciled ✓)"]
      }
    },

    customer_crm: {
      title: "Messy Leads / Customer Data",
      before: {
        type: "raw_pdf",
        meta: "RAW_LEADS_DUMP_EXPORT.CSV (Corrupt casing, bad phone numbers)",
        lines: [
          "1.  hEmAnTh   kUmAr   ||   9848022338   ||   hemanth.k@GMAIL.com   ||   Vizag ,   AP",
          "2.  Sarah M. Jenkins  ||  +91 98491-88210  ||  s.jenkins@FINCORP.io  ||  Hyderabad, TS",
          "3.  hEmAnTh   kUmAr   ||   +91 9848022338   ||   hemanth.k@gmail.com   ||   Visakhapatnam",
          "4.  DR. RAJESH V. SHARMA  ||  09876543210  ||  rsharma@HEALTHCARE.ORG  ||  Bangalore, KA",
          "5.  ananya   verma   ||   (982) 345-6789   ||   ananya.v@cloudtech.in   ||   Mumbai, MH"
        ]
      },
      after: {
        headers: ["Full Name", "Clean Phone (+91)", "Verified Email", "City / State", "Quality Status"],
        rows: [
          ["Hemanth Kumar", "+91 98480 22338", "hemanth.k@gmail.com", "Visakhapatnam (AP)", "De-duplicated ✓"],
          ["Sarah Jenkins", "+91 98491 88210", "s.jenkins@fincorp.io", "Hyderabad (TS)", "Valid Email ✓"],
          ["Dr. Rajesh Sharma", "+91 98765 43210", "rsharma@healthcare.org", "Bengaluru (KA)", "Parsed Title ✓"],
          ["Ananya Verma", "+91 98234 56789", "ananya.v@cloudtech.in", "Mumbai (MH)", "Standardized ✓"]
        ],
        total: ["SUMMARY", "4 Clean Records", "1 Duplicate Removed", "100% Normalized", "Ready for CRM"]
      }
    }
  },

  // 2. Live Interactive Cleaner Demo Datasets
  cleanerSamples: {
    ecommerce: {
      name: "E-commerce Orders (Dates, Currency & Duplicates)",
      headers: ["Order ID", "Customer Name", "Raw Date", "Price String", "Phone Number", "Audit Status"],
      rows: [
        ["#ORD-9021", "  rohit   sharma  ", "10/04/2025", "INR ₹1,499.00", "98480 12345", "Original"],
        ["#ORD-9022", "PRIYA  NAIR ", "2025.11.02", "890.50 inr", "98490-98765", "Original"],
        ["#ORD-9021", "  Rohit Sharma", "10/04/2025", "₹1,499.00", "+91 98480 12345", "DUPLICATE"],
        ["#ORD-9023", "vikram s. reddy", "09-15-2025", "₹12,490.00", "98850.23456", "Original"],
        ["#ORD-9024", "KAVITHA  RAO ", "2025/12/30", "4,500.00 rs", "(987) 654-3210", "Original"],
        ["#ORD-9023", "Vikram Reddy", "09/15/2025", "12490.00", "9885023456", "DUPLICATE"]
      ]
    },

    financial: {
      name: "Financial Statements (Reconciliation & Amounts)",
      headers: ["Tx ID", "Entity / Vendor", "Date String", "Amount (₹)", "Payment Mode", "Audit Status"],
      rows: [
        ["TX-101", "MICROSOFT*AZURE CLOUD", "01/14/2025", "   -₹4,500.00   ", "cc_visa", "UNVERIFIED"],
        ["TX-102", "uber   technologies ", "2025-01-15", "-₹324.00 INR", "upi_gpay", "UNVERIFIED"],
        ["TX-103", "CLIENT RETAINER INVC", "Jan 16, 2025", "+₹84,500.00", "neft_bank", "UNVERIFIED"],
        ["TX-101", "Microsoft Azure Cloud", "01/14/2025", "-₹4,500.00", "cc_visa", "DUPLICATE"],
        ["TX-104", "GITHUB SUBSCRIPTION", "18/01/2025", "-₹1,850.00", "cc_master", "UNVERIFIED"]
      ]
    },

    crm_leads: {
      name: "Sales Leads (Names, Emails & Whitespace)",
      headers: ["Lead ID", "Contact Name", "Email Address", "Deal Value", "Location", "Quality Score"],
      rows: [
        ["L-881", "   suresh   raina   ", "SURESH@TECHVENTURES.IN", "₹2,50,000", "hyderabad", "Raw"],
        ["L-882", "karthik subbaraj", "karthik@mediaworks.co", "₹1,20,000", "chennai", "Raw"],
        ["L-883", "sNeHa   mEnOn", "sneha.m@fincorp.in", "₹75,000.50", "bengaluru", "Raw"],
        ["L-881", "Suresh Raina", "suresh@techventures.in", "250000", "Hyderabad, TS", "DUPLICATE"],
        ["L-884", "DEEPAK  VARMA", "deepak.v@vizagsteel.in", "₹95,000", "vizag", "Raw"]
      ]
    }
  },

  // 3. Realistic Case Studies
  caseStudies: [
    {
      id: "cs-1",
      category: "Banking & Reconciliation",
      title: "Bank Statement Conversion & Tally / QuickBooks Reconciliation",
      client: "CA & Accounting Consultancy (Hyderabad, India)",
      icon: "fa-solid fa-building-columns",
      description: "Extracted 180+ scanned multi-page bank statements across HDFC and ICICI accounts into a structured Excel workbook with automated cashflow debit/credit reconciliation checks.",
      metrics: [
        { label: "Pages Converted", value: "184 Pages" },
        { label: "Delivery Time", value: "18 Hours" },
        { label: "Math Accuracy", value: "100% Match" }
      ],
      tags: ["Bank Statements", "OCR", "Tally Ready", "Formulas"]
    },
    {
      id: "cs-2",
      category: "E-Commerce",
      title: "35,000-Row Product Catalog & SKU Standardization",
      client: "Multi-Brand Retail Store (Bangalore, India)",
      icon: "fa-solid fa-cart-shopping",
      description: "Cleaned a messy multi-vendor inventory file with corrupt SKUs, inconsistent category names, and broken GST percentages using Excel Power Query pipelines.",
      metrics: [
        { label: "Rows Cleaned", value: "35,000 Rows" },
        { label: "Duplicates Fixed", value: "2,400 Purged" },
        { label: "Format", value: "Clean CSV / XLSX" }
      ],
      tags: ["Power Query", "Deduplication", "SKU Cleanup", "GST Audit"]
    },
    {
      id: "cs-3",
      category: "Invoices & Logistics",
      title: "OCR Extraction of 450+ Scanned Freight & Tax Invoices",
      client: "Logistics & Transport Provider (Vizag, India)",
      icon: "fa-solid fa-truck-fast",
      description: "Parsed skewed, low-resolution scanned bills and manifests, extracting vehicle numbers, weight, GST taxable amounts, and freight totals into an ERP-ready spreadsheet.",
      metrics: [
        { label: "Invoices Parsed", value: "450+ Docs" },
        { label: "Error Rate", value: "0.00%" },
        { label: "Turnaround", value: "12 Hours" }
      ],
      tags: ["Scanned OCR", "Invoice Tables", "ERP Import", "VBA"]
    },
    {
      id: "cs-4",
      category: "Real Estate & Analytics",
      title: "Property Listing Extraction & Automated ROI Model",
      client: "Commercial Real Estate Firm (Hyderabad / Vizag)",
      icon: "fa-solid fa-city",
      description: "Converted 800+ property brochures and pricing flyers into an interactive financial model with automated price-per-sqft, EMI calculators, and dynamic pivot tables.",
      metrics: [
        { label: "Listings Processed", value: "800+ Units" },
        { label: "Formulas Configured", value: "25+ Formulas" },
        { label: "Rating", value: "5.0 ★★★★★" }
      ],
      tags: ["Real Estate", "Financial Formulas", "Pivot Tables", "Data Parsing"]
    }
  ],

  // 4. Genuine Client Feedback & Reviews
  reviews: [
    {
      name: "Rajesh K.",
      role: "Chartered Accountant",
      country: "India 🇮🇳",
      avatar: "RK",
      category: "conversion",
      rating: 5,
      gigType: "PDF to Excel Conversion",
      text: "Hemanth did a stellar job converting over 40 scanned bank statements for an urgent client audit. Every single transaction matched the closing balance. His cybersecurity background also gave me peace of mind regarding data confidentiality!"
    },
    {
      name: "David Miller",
      role: "Operations Manager",
      country: "United States 🇺🇸",
      avatar: "DM",
      category: "cleaning",
      rating: 5,
      gigType: "Excel Data Cleaning",
      text: "Exceptional speed and precision. We had 12,000 messy customer records with duplicate phone numbers and mismatched dates. Delivered a spotless spreadsheet within hours. Highly recommended on Fiverr!"
    },
    {
      name: "Sneha Reddy",
      role: "E-Commerce Founder",
      country: "India 🇮🇳",
      avatar: "SR",
      category: "automation",
      rating: 5,
      gigType: "Excel Formulas & Power Query",
      text: "Hemanth built a reusable Power Query template for our weekly vendor sales reports. Saved us at least 10 hours of manual work every week. Very polite, responsive, and skilled."
    },
    {
      name: "Sophie Laurent",
      role: "Finance Lead",
      country: "France 🇫🇷",
      avatar: "SL",
      category: "conversion",
      rating: 5,
      gigType: "PDF to Excel Conversion",
      text: "Fastest turnaround I have seen on Fiverr. Converted 25 pages of complex multi-column invoices in under 3 hours with 100% accuracy. Will definitely hire again."
    },
    {
      name: "Vikram Singhania",
      role: "Real Estate Consultant",
      country: "India 🇮🇳",
      avatar: "VS",
      category: "cleaning",
      rating: 5,
      gigType: "Excel Data Cleaning",
      text: "Cleaned and standardized 5,000 property listing records with clean phone formats and location tags. Delivered ahead of time and made revisions instantly."
    },
    {
      name: "Markus Weber",
      role: "Managing Director",
      country: "Germany 🇩🇪",
      avatar: "MW",
      category: "automation",
      rating: 5,
      gigType: "Excel VBA & Dashboards",
      text: "Great communication and very solid programming skills. Delivered custom Excel formulas and clean pivot tables that our management team loved. 5/5 stars!"
    }
  ]
};
