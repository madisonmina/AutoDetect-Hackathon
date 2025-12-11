## AutoDetect
### Quality Assurance Assistant — Innovation Labs Fall 2025 (Xorbix × MSOE AI Club)
By: Madison Mina, Helina Mulugata, Morgan Redrup and Sydney Madden

### Overview
AutoDetect is an AI-powered visual inspection assistant designed to speed up and improve quality assurance on manufacturing conveyor lines. The system identifies defects in jarlids automatically, helping operators reduce inspection time and minimize human error.

This project was developed as part of Innovation Labs Fall 2025, a semester-long applied AI competition hosted by MSOE AI Club (MAIC) in partnership with Xorbix Technologies.

### Problem
Manual inspection of jarlids takes 6–12 minutes per inspection and results in ~23% human error.
The process is repetitive, time-sensitive, and highly dependent on individual attention levels.

Operators need a faster, more reliable way to detect defects in real time.

### Our Solution: AutoDetect
AutoDetect is a lightweight computer vision workflow that allows employees to:
- Add images from the conveyor line
- Automatically detect defects using a trained CV model
- Make quick pass/fail decisions with visual explanations
- Minimize time spent per inspection while maximizing accuracy

### Model Architecture & Techniques
- Defect Detector (Primary Classifier)
- High-recall model designed to catch as many defects as possible
- Outputs labels such as {Defect, 0.94}
- Optimized for speed (< 1 second per image)

### SAM2 Integration
- Used for clean segmentation of jarlids
- Enables retrainability and easy adaptation to new defect types
- Grad-CAM++ (Gradient Weighted Class Activation Mapping++)
  - Highlights the regions that drive the model’s final decision
- Gives operators transparency and trust in the output

### Results
AutoDetect achieves:
- 95% reduction in inspection time
- 90% reduction in human error
- Image analysis in under 1 second
Transferable to other conveyor-based manufacturing environments

### Tech Stack
- Python / PyTorch (or TensorFlow, if applicable)
- SAM2 for segmentation
- Grad-CAM++ for interpretability
- MSOE Rosie SuperComputer
- Jarlids dataset (cropped and labeled for training)

### Roadmap / Future Implementations
- Add multi-class defect types (scratches, dents, discoloration)
- Deploy as an edge-friendly model for on-device inference
- Integrate with live conveyor belt camera feeds
- Expand to other manufacturing lines beyond jarlids
- Add continuous retraining pipeline through Databricks workflows
