# 3JS Tutorial Project

A comprehensive collection of interactive web graphics tutorials and examples built with Three.js, demonstrating advanced 3D rendering techniques, animations, and real-time visualizations in the browser.

## 🚀 Features

- **Interactive 3D Scenes**: Explore multiple examples showcasing Three.js capabilities
- **Real-time Animations**: Lorenz attractor simulation and dynamic particle systems
- **WebGL Rendering**: High-performance graphics using modern web technologies
- **Responsive Design**: Optimized for various screen sizes and devices
- **Educational Content**: Step-by-step tutorials for learning 3D web development

## 🛠 Technologies Used

- **Three.js**: Core 3D graphics library
- **JavaScript (ES6+)**: Client-side scripting and interactivity
- **HTML5 & CSS3**: Structure and styling
- **Python Flask**: Lightweight server for serving static assets
- **WebGL**: Hardware-accelerated graphics rendering

## 📋 Prerequisites

- Python 3.10+
- Conda (recommended for environment management)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd 3JS-Tutorial
   ```

2. Create and activate a conda environment:
   ```bash
   conda create --name 3js python=3.10 -y
   conda activate 3js
   ```

3. Install dependencies:
   ```bash
   python -m pip install -U pip
   pip install -r requirements.txt
   ```

## ▶️ Usage

Start the development server:
```bash
python server.py
```

Open your browser and navigate to `http://localhost:8000` to access the tutorials.

## 📚 Tutorials Included

1. **Basic Scene Setup** (`app1.js`) - Introduction to Three.js scene, camera, and renderer
2. **Geometry and Materials** (`app2.js`) - Creating 3D objects with different materials
3. **Lighting and Shadows** (`app3.js`) - Implementing various lighting techniques
4. **Animations** (`app4.js`) - Keyframe animations and object transformations
5. **Advanced Rendering** (`app5.js`) - Post-processing effects and advanced shaders
6. **Lorenz Attractor** (`Lorenz.js`) - Mathematical visualization of chaotic systems

Each tutorial includes corresponding HTML templates in the `templates/` directory.

## 🎯 Learning Outcomes

By working through these tutorials, you'll gain expertise in:
- 3D mathematics and transformations
- Shader programming and GPU acceleration
- Performance optimization for web graphics
- Cross-browser compatibility
- Modern JavaScript development practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*Built with passion for web graphics and 3D development. Perfect for showcasing skills in modern web technologies and interactive visualizations.*