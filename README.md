# 🛰️ LandShield India

## AI-Assisted Disaster Risk, Red-Zone & Relocation Decision-Support Platform

**Smart India Hackathon 2026 — SIH26001**  
**Organization:** Ministry of Home Affairs  
**Department:** National Disaster Response Force (NDRF), DM Division  
**Category:** Software  
**Theme:** Disaster Management  

---

## 🎯 Problem Statement

LandShield India is being developed in response to SIH26001: **Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations.**

India's disaster-prone regions face recurring hazards including **landslides, floods, coastal erosion and cloudbursts**. Vulnerable habitations can remain in unsafe zones, resulting in repeated loss of life and property. Relocation efforts are often reactive and begin after disasters have already occurred rather than being supported by proactive, evidence-based planning.

The problem calls for an intelligent, GIS-enabled decision-support platform that can:

- Dynamically identify and update **hazard-based Red Zones** — areas unsuitable for permanent habitation.
- Assess the **carrying capacity and suitability of safer alternative sites**.
- Integrate **hazard intensity, population vulnerability and disaster history**.
- Prioritize vulnerable habitations that require relocation.
- Support **immediate, short-term and medium-term relocation planning**.
- Provide actionable insights to **State Disaster Management Authorities and other disaster-management stakeholders**.

The objective is therefore broader than a single hazard or a single region. LandShield India is designed as a framework for **multi-hazard spatial risk, vulnerable-habitation prioritization and relocation decision support across India**.

---

## 💡 LandShield India Solution

LandShield India combines geospatial analysis, machine learning, AI-assisted assessment and human field verification into a common decision-support workflow.

```text
Hazard & Geospatial Data
          ↓
Data Cleaning & Preparation
          ↓
Spatial Feature Engineering
          ↓
Hazard / Susceptibility Assessment
          ↓
GIS Red-Zone & Risk Visualization
          ↓
Vulnerability / Impact Assessment
          ↓
Relocation-Site & Carrying-Capacity Assessment
          ↓
Vulnerable-Habitation Prioritization
          ↓
Field Verification
          ↓
Decision Support for Authorities
```

The broader decision-support chain is:

> **Identify → Assess → Verify → Prioritize → Relocate → Monitor**

The current public prototype implements the **landslide susceptibility and assessment component** most concretely, while the architecture is intended to grow toward the complete SIH26001 multi-hazard and relocation objective.

---

# 🧭 What the Platform Is Designed to Answer

LandShield India is designed around practical questions faced by disaster-management authorities:

### 1. Where are hazardous or potentially unsafe zones?

Use historical hazard information, terrain and other spatial evidence to identify areas requiring attention.

### 2. Which habitations are most vulnerable?

Combine hazard exposure with habitation/population and other vulnerability information to support prioritization.

### 3. What could be affected?

Assess potential exposure of settlements, roads, infrastructure and critical facilities.

### 4. Where could safer relocation happen?

Evaluate candidate locations using suitability and carrying-capacity information as the relocation component is expanded.

### 5. What requires immediate attention?

Prioritize vulnerable habitations and field observations so authorities can focus limited response resources where they matter most.

---

# 🗺️ Current Web Platform

The deployed prototype provides a dashboard-style decision-support interface with:

- **Dashboard** — overview of the current V1 landslide model and dataset.
- **Risk Map** — interactive visualization of model susceptibility scores on existing GSI sample points.
- **Alerts** — elevated-susceptibility points from the V1 model.
- **Field Reports** — human-in-the-loop submission of observed ground conditions and evidence.
- **TerraGuard Intelligence** — AI-assisted assessment of uploaded satellite/aerial imagery through the GeoGuard AI service.
- **Analytics** — model and dataset statistics.
- **About** — model, training data, evaluation and project scope.

The frontend is published through **GitHub Pages** from the repository's `docs/` directory.

---

# 🧠 Current V1 Machine-Learning Model

The current V1 model is a **landslide susceptibility / risk classification model** built from GSI-derived sample data.

### V1 model features

The current trained model uses four features:

| Feature | Meaning |
|---|---|
| `elevation_m` | Elevation in metres |
| `slope_deg` | Terrain slope in degrees |
| `historical_landslide_density` | Historical documented-landslide density within the configured spatial neighbourhood |
| `historical_landslide_distance` | Distance to the nearest documented historical landslide |

Rainfall, soil-moisture and NDVI-derived variables exist in the broader data pipeline but are **not part of the current V1 trained feature set** because of missingness in the current table. They are candidates for later model versions.

---

# 📊 V1 Dataset

The current cleaned V1 dataset contains **6,707 sample records covering 16 states/UTs**:

- **2,223** documented landslide points
- **4,484** background / pseudo-negative points
- **6,707** total records

The model uses a spatial train/test split based on **0.5° grid cells**, rather than a purely random row split.

This dataset is a **V1 landslide-susceptibility dataset**. It should not be interpreted as a complete national hazard inventory or as the final implementation of the full multi-hazard relocation problem statement.

---

# 📈 V1 Model Evaluation

The current held-out spatial test results are:

| Metric | V1 result |
|---|---:|
| Accuracy | 0.9536 |
| Precision | 0.9455 |
| Recall | 0.8490 |
| F1 score | 0.8946 |
| ROC-AUC | 0.9657 |

The model is intended to provide a **relative susceptibility / decision-support score**, not a scientifically validated probability of a future landslide.

### Important limitation

The current historical-density and historical-distance features were computed against the full available GSI inventory without a per-sample date cutoff. This creates a possible form of **temporal leakage**, so the reported metrics should be treated as an optimistic upper bound until time-safe historical features are recomputed.

---

# 🛰️ TerraGuard Intelligence

TerraGuard extends LandShield beyond the static V1 susceptibility map by providing an AI-assisted imagery assessment workflow.

Users can upload satellite or aerial imagery and request an assessment through the GeoGuard AI backend.

The current interface is designed around:

```text
Satellite / Aerial Image
          ↓
GeoGuard SegFormer
          ↓
Local Gemma 2 Reasoning
          ↓
Assessment
          ↓
Recommendations
          ↓
HTML / PDF Report
```

TerraGuard is an **AI-assisted assessment component**, not an official disaster-warning system.

---

# 👥 Field Verification

LandShield follows a human-in-the-loop approach because model outputs and remote sensing cannot replace ground verification.

The Field Reports workflow allows a user to submit:

- State / Union Territory
- Location description
- Observation type
- Description of the observed condition
- Photographic field evidence
- Current location, where available

Examples of observations include visible cracks, rockfall, soil movement and road blockage.

The purpose is to connect model-assisted assessment with **real observations from the ground**.

---

# 🏘️ Relocation & Carrying-Capacity Vision

The SIH26001 objective goes beyond identifying hazardous locations. A complete system must also help determine:

1. **Which habitations should be considered unsafe for permanent habitation?**
2. **Which vulnerable habitations should receive relocation priority?**
3. **Which candidate sites are suitable for relocation?**
4. **Can those sites support the expected population and essential services?**
5. **What are the immediate, short-term and medium-term relocation options?**

The LandShield architecture is intended to support these functions through future integration of:

- Hazard intensity and hazard-specific Red Zones
- Population and habitation vulnerability
- Disaster history
- Land-use and land-suitability information
- Infrastructure accessibility
- Essential-service availability
- Candidate-site carrying capacity
- Relocation prioritization
- Field verification

These capabilities should be developed and validated progressively; the current V1 prototype should not be presented as already solving every relocation or carrying-capacity requirement.

---

# 🌏 Multi-Hazard Scope

The **problem statement is not limited to landslides and is not limited to Northeast India**.

The broader target includes recurring hazards such as:

- 🌋 Landslides
- 🌊 Floods
- 🌊 Coastal erosion
- ⛈️ Cloudbursts
- Other hazard layers that can be incorporated as the platform expands

The current V1 implementation is strongest on **landslide susceptibility**, using GSI-derived data. This is a deliberate implementation stage within the larger SIH26001 architecture.

The long-term platform should be able to combine multiple hazard layers to support a common spatial view of vulnerability and relocation needs.

---

# 🗺️ Geographic Scope

LandShield India is intended for **India-wide application** rather than being an exclusively Northeast-India product.

The current V1 dataset covers **16 states/UTs**, and the existing landslide data pipeline includes a Sikkim pilot dataset. These are implementation/data-availability details of the current prototype — they do not define the geographic scope of the SIH26001 problem statement.

The architecture is intended to scale as additional hazard, population, infrastructure and relocation-site datasets become available.

---

# 🧪 Data & GIS Pipeline

The repository contains scripts and datasets for:

- GSI landslide-inventory cleaning and normalization
- Historical landslide processing
- Terrain feature preparation
- NDVI feature preparation
- Environmental feature preparation
- Pseudo-negative/background sampling
- Training-table construction
- Model prediction generation
- GIS risk-map generation

The current V1 model deliberately uses only the four features listed above. Broader data layers are part of the project's expansion path rather than claims about the current trained model.

---

# 📁 Repository Structure

```text
LandShield-India/
├── data/
│   ├── gsi/
│   │   ├── gsi_dated_events.csv
│   │   ├── gsi_historical_susceptibility.csv
│   │   ├── gsi_landslide_inventory.csv
│   │   ├── gsi_landslide_inventory_normalized.csv
│   │   ├── gsi_model_training.csv
│   │   ├── gsi_ndvi_features.csv
│   │   ├── gsi_ner_training_table.csv
│   │   ├── gsi_pseudo_negative_samples.csv
│   │   ├── gsi_terrain_features.csv
│   │   ├── gsi_year_only_inventory.csv
│   │   ├── model_metrics.json
│   │   └── test_predictions.csv
│   └── landslides/
│       ├── sikkim_2023_landslides.csv
│       └── sikkim_2023_landslides.geojson
│
├── docs/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── maps/
│
├── maps/
│   └── landslide_v1_risk_map.html
│
├── add_landslide_labels.py
├── build_gsi_training_table.py
├── build_india_environmental_features.py
├── clean_gsi_inventory.py
├── compute_historical_susceptibility_gsi.py
├── compute_hybrid_risk.py
├── extract_gsi_pdf.py
├── fetch_ndvi_gsi.py
├── fetch_terrain_features_gsi.py
├── make_model_risk_map.py
├── normalize_gsi_inventory.py
├── prepare_gsi_training_data.py
├── sample_pseudo_negatives.py
└── README.md
```

---

# 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Leaflet
- Chart.js
- GitHub Pages

### Machine Learning

- Python
- XGBoost
- Scikit-learn
- PyTorch-based AI components in the broader GeoGuard/TerraGuard workflow

### Geospatial Processing

- GeoPandas
- Raster/vector processing
- GeoJSON
- GIS-based interactive mapping

### AI Assessment

- GeoGuard SegFormer
- Local Gemma 2 reasoning
- FastAPI backend for TerraGuard/GeoGuard integration

---

# ⚠️ Prototype Status & Responsible Use

LandShield India is a **Smart India Hackathon prototype and decision-support system**.

It is not a replacement for:

- Official disaster warnings
- Government hazard notifications
- Geological or engineering surveys
- Ground-truth verification
- Statutory relocation decisions

A model score is an indication for investigation and prioritization, not proof that a disaster will occur at a particular location or time.

Before operational deployment, the system requires additional validation, including independent spatial/temporal testing, improved time-safe historical features, broader hazard coverage, validated vulnerability data, carrying-capacity methodology and expert review.

---

# 🚀 Future Development

The next stages of LandShield India are aligned with the full SIH26001 objective:

1. **Expand beyond landslide-only V1 into a multi-hazard risk framework.**
2. **Develop hazard-based Red-Zone identification.**
3. **Integrate habitation and population vulnerability.**
4. **Add candidate relocation-site suitability assessment.**
5. **Implement carrying-capacity assessment for safer sites.**
6. **Prioritize vulnerable habitations for immediate, short-term and medium-term relocation.**
7. **Integrate verified field observations into the decision-support loop.**
8. **Strengthen spatial and temporal validation.**
9. **Expand geographic coverage across India.**

---

# 🏆 Smart India Hackathon

**Problem Statement ID:** SIH26001  
**Title:** Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations  
**Category:** Software  
**Theme:** Disaster Management  
**Organization:** Ministry of Home Affairs  
**Department:** National Disaster Response Force (NDRF), DM Division  

---

## 👥 Team Six Bits

Built for **Smart India Hackathon 2026**.

> **Risk → Vulnerability → Verification → Relocation Priority → Action**
