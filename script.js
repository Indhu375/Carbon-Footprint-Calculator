// Carbon Footprint Calculator - Main Application
class CarbonFootprintCalculator {
  constructor() {
      this.data = {
          transportation: {},
          energy: {},
          food: {},
          lifestyle: {}
      };
      
      this.currentCategory = null;
      this.init();
      this.loadData();
  }

  init() {
      this.bindEvents();
      this.updateUI();
  }

  bindEvents() {
      // Category selection
      document.querySelectorAll('.category-card').forEach(card => {
          card.addEventListener('click', (e) => {
              const category = e.currentTarget.dataset.category;
              this.showCalculator(category);
          });
      });

      // Navigation
      document.getElementById('back-btn').addEventListener('click', () => {
          this.showHome();
      });

      document.getElementById('results-back-btn').addEventListener('click', () => {
          this.showHome();
      });

      document.getElementById('recalculate-btn').addEventListener('click', () => {
          this.showHome();
      });

      // Calculate results
      document.getElementById('calculate-btn').addEventListener('click', () => {
          this.showResults();
      });

      // Save and continue
      document.getElementById('save-continue-btn').addEventListener('click', () => {
          this.saveCurrentCategory();
          this.showHome();
      });

      const saveBtn = document.getElementById('save-server-btn');
      if (saveBtn) {
          saveBtn.addEventListener('click', () => {
              this.saveToServer();
          });
      }
  }

  showScreen(screenId) {
      document.querySelectorAll('.screen').forEach(screen => {
          screen.classList.remove('active');
      });
      document.getElementById(screenId).classList.add('active');
  }

  showHome() {
      this.showScreen('home-screen');
      this.updateUI();
  }

  showCalculator(category) {
      this.currentCategory = category;
      this.showScreen('calculator-screen');
      this.renderCalculatorForm(category);
  }

  showResults() {
      this.showScreen('results-screen');
      this.renderResults();
  }

  renderCalculatorForm(category) {
      const forms = {
          transportation: this.renderTransportationForm,
          energy: this.renderEnergyForm,
          food: this.renderFoodForm,
          lifestyle: this.renderLifestyleForm
      };

      const config = {
          transportation: { title: 'Transportation', icon: '🚗', color: '#3b82f6' },
          energy: { title: 'Home Energy', icon: '🏠', color: '#10b981' },
          food: { title: 'Food & Diet', icon: '🍽️', color: '#f59e0b' },
          lifestyle: { title: 'Lifestyle', icon: '🛍️', color: '#8b5cf6' }
      };

      // Update header
      const titleElement = document.getElementById('calculator-title-text');
      const iconElement = document.querySelector('.calculator-icon');
      
      titleElement.textContent = config[category].title;
      iconElement.textContent = config[category].icon;
      iconElement.style.background = config[category].color;
      iconElement.style.color = 'white';

      // Render form
      const formContainer = document.getElementById('calculator-form');
      formContainer.innerHTML = forms[category].call(this);
      
      // Populate existing data
      this.populateFormData(category);
  }

  renderTransportationForm() {
      return `
          <div class="form-section" style="background: #dbeafe; border-color: #3b82f6;">
              <h3><span class="section-icon">🚗</span>Car Travel</h3>
              <div class="form-grid">
                  <div class="form-group">
                      <label class="form-label">Miles driven per year</label>
                      <input type="number" name="carMilesPerYear" class="form-input" placeholder="e.g., 12000">
                      <div class="form-help">Average US driver: 13,500 miles/year</div>
                  </div>
                  <div class="form-group">
                      <label class="form-label">Vehicle fuel efficiency (MPG)</label>
                      <input type="number" name="carMpg" class="form-input" placeholder="e.g., 25">
                      <div class="form-help">Average US vehicle: 25 MPG</div>
                  </div>
              </div>
          </div>

          <div class="form-section" style="background: #e0e7ff; border-color: #6366f1;">
              <h3><span class="section-icon">✈️</span>Air Travel</h3>
              <div class="form-group">
                  <label class="form-label">Flight hours per year</label>
                  <input type="number" name="flightHoursPerYear" class="form-input" placeholder="e.g., 10">
                  <div class="form-help">Rough estimates: Domestic flight 2-6 hours, International 6-15 hours</div>
              </div>
          </div>

          <div class="form-section" style="background: #ccfbf1; border-color: #14b8a6;">
              <h3><span class="section-icon">🚌</span>Public Transportation</h3>
              <div class="form-group">
                  <label class="form-label">Hours per week on public transport</label>
                  <input type="number" name="publicTransportHoursPerWeek" class="form-input" placeholder="e.g., 5">
                  <div class="form-help">Includes buses, trains, subways, and other mass transit</div>
              </div>
          </div>
      `;
  }

  renderEnergyForm() {
      return `
          <div class="form-section" style="background: #dcfce7; border-color: #10b981;">
              <h3><span class="section-icon">🏠</span>Home Information</h3>
              <div class="form-group">
                  <label class="form-label">Home size (square feet)</label>
                  <input type="number" name="homeSize" class="form-input" placeholder="e.g., 2000">
                  <div class="form-help">Average US home: 2,261 square feet</div>
              </div>
          </div>

          <div class="form-section" style="background: #fef3c7; border-color: #f59e0b;">
              <h3><span class="section-icon">⚡</span>Electricity Usage</h3>
              <div class="form-grid">
                  <div class="form-group">
                      <label class="form-label">kWh used per month</label>
                      <input type="number" name="electricityKwhPerMonth" class="form-input" placeholder="e.g., 900">
                      <div class="form-help">Check your electricity bill or estimate</div>
                  </div>
                  <div class="form-group">
                      <label class="form-label">Renewable energy percentage (%)</label>
                      <input type="number" name="renewableEnergy" class="form-input" placeholder="e.g., 20" min="0" max="100">
                      <div class="form-help">Solar panels, green energy plan, etc.</div>
                  </div>
              </div>
          </div>

          <div class="form-section" style="background: #fed7aa; border-color: #ea580c;">
              <h3><span class="section-icon">🔥</span>Natural Gas & Heating</h3>
              <div class="form-group">
                  <label class="form-label">Therms used per month</label>
                  <input type="number" name="naturalGasThermPerMonth" class="form-input" placeholder="e.g., 50">
                  <div class="form-help">Used for heating, hot water, cooking. Check your gas bill or enter 0 if all-electric</div>
              </div>
          </div>
      `;
  }

  renderFoodForm() {
      return `
          <div class="form-section" style="background: #fed7aa; border-color: #f59e0b;">
              <h3><span class="section-icon">🍽️</span>Diet Type</h3>
              <div class="radio-group">
                  <label class="radio-option">
                      <input type="radio" name="dietType" value="omnivore">
                      <span>Omnivore (eat everything)</span>
                  </label>
                  <label class="radio-option">
                      <input type="radio" name="dietType" value="pescatarian">
                      <span>Pescatarian (fish but no meat)</span>
                  </label>
                  <label class="radio-option">
                      <input type="radio" name="dietType" value="vegetarian">
                      <span>Vegetarian (no meat or fish)</span>
                  </label>
                  <label class="radio-option">
                      <input type="radio" name="dietType" value="vegan">
                      <span>Vegan (no animal products)</span>
                  </label>
              </div>
          </div>

          <div class="form-section" style="background: #fee2e2; border-color: #ef4444;">
              <h3><span class="section-icon">🥩</span>Meat Consumption</h3>
              <div class="form-group">
                  <label class="form-label">Meat meals per week</label>
                  <input type="number" name="meatMealsPerWeek" class="form-input" placeholder="e.g., 7">
                  <div class="form-help">Average American: 10-14 meals with meat per week</div>
              </div>
          </div>

          <div class="form-section" style="background: #dbeafe; border-color: #3b82f6;">
              <h3><span class="section-icon">🥛</span>Dairy Consumption</h3>
              <div class="form-group">
                  <label class="form-label">Dairy servings per day</label>
                  <input type="number" name="dairyServingsPerDay" class="form-input" placeholder="e.g., 3">
                  <div class="form-help">1 serving = 1 cup milk, 1 slice cheese, 1 cup yogurt</div>
              </div>
          </div>

          <div class="form-section" style="background: #dcfce7; border-color: #10b981;">
              <h3><span class="section-icon">🌱</span>Sustainable Food Choices</h3>
              <div class="form-grid">
                  <div class="form-group">
                      <label class="form-label">Local food percentage (%)</label>
                      <input type="number" name="localFood" class="form-input" placeholder="e.g., 30" min="0" max="100">
                      <div class="form-help">Farmers markets, local produce</div>
                  </div>
                  <div class="form-group">
                      <label class="form-label">Organic food percentage (%)</label>
                      <input type="number" name="organicFood" class="form-input" placeholder="e.g., 20" min="0" max="100">
                      <div class="form-help">Certified organic products</div>
                  </div>
              </div>
          </div>
      `;
  }

  renderLifestyleForm() {
      return `
          <div class="form-section" style="background: #e9d5ff; border-color: #8b5cf6;">
              <h3><span class="section-icon">🛍️</span>Shopping Habits</h3>
              <div class="radio-group">
                  <label class="radio-option">
                      <input type="radio" name="shoppingFrequency" value="minimal">
                      <span>Minimal - Only buy necessities</span>
                  </label>
                  <label class="radio-option">
                      <input type="radio" name="shoppingFrequency" value="low">
                      <span>Low - Occasional purchases</span>
                  </label>
                  <label class="radio-option">
                      <input type="radio" name="shoppingFrequency" value="average">
                      <span>Average - Regular shopping</span>
                  </label>
                  <label class="radio-option">
                      <input type="radio" name="shoppingFrequency" value="high">
                      <span>High - Frequent shopping</span>
                  </label>
                  <label class="radio-option">
                      <input type="radio" name="shoppingFrequency" value="very_high">
                      <span>Very High - Daily purchases</span>
                  </label>
              </div>
              
              <div class="form-group" style="margin-top: 1.5rem;">
                  <label class="form-label">New clothing items purchased per month</label>
                  <input type="number" name="newClothesPerMonth" class="form-input" placeholder="e.g., 3">
                  <div class="form-help">Average American: 5-7 items per month</div>
              </div>
          </div>

          <div class="form-section" style="background: #dcfce7; border-color: #10b981;">
              <h3><span class="section-icon">♻️</span>Waste & Recycling</h3>
              <div class="form-grid">
                  <div class="form-group">
                      <label class="form-label">Recycling rate (%)</label>
                      <input type="number" name="recyclingRate" class="form-input" placeholder="e.g., 75" min="0" max="100">
                      <div class="form-help">Percentage of recyclables actually recycled</div>
                  </div>
                  <div class="form-group">
                      <label class="form-label">Waste reduction efforts (%)</label>
                      <input type="number" name="wasteReduction" class="form-input" placeholder="e.g., 50" min="0" max="100">
                      <div class="form-help">Composting, meal planning, reusing items</div>
                  </div>
              </div>
          </div>

          <div class="form-section" style="background: #ccfbf1; border-color: #14b8a6;">
              <h3><span class="section-icon">📦</span>Sustainable Consumption</h3>
              <div class="form-group">
                  <label class="form-label">Second-hand purchases (%)</label>
                  <input type="number" name="secondHandPurchases" class="form-input" placeholder="e.g., 30" min="0" max="100">
                  <div class="form-help">Thrift stores, consignment shops, used electronics, etc.</div>
              </div>
          </div>
      `;
  }

  populateFormData(category) {
      const categoryData = this.data[category];
      
      // Populate text inputs
      document.querySelectorAll('#calculator-form input[type="number"]').forEach(input => {
          const name = input.name;
          if (categoryData[name] !== undefined) {
              input.value = categoryData[name];
          }
      });

      // Populate radio buttons
      document.querySelectorAll('#calculator-form input[type="radio"]').forEach(input => {
          const name = input.name;
          if (categoryData[name] === input.value) {
              input.checked = true;
          }
      });
  }

  saveCurrentCategory() {
      if (!this.currentCategory) return;

      const formData = {};
      
      // Collect form data
      document.querySelectorAll('#calculator-form input').forEach(input => {
          if (input.type === 'radio') {
              if (input.checked) {
                  formData[input.name] = input.value;
              }
          } else {
              const value = parseFloat(input.value);
              if (!isNaN(value) && value >= 0) {
                  formData[input.name] = value;
              }
          }
      });

      this.data[this.currentCategory] = formData;
      this.saveData();
  }

  updateUI() {
      // Update category completion indicators
      document.querySelectorAll('.category-card').forEach(card => {
          const category = card.dataset.category;
          const hasData = Object.keys(this.data[category]).length > 0;
          
          if (hasData) {
              card.classList.add('completed');
              const btn = card.querySelector('.category-btn');
              btn.textContent = 'Update Data';
          } else {
              card.classList.remove('completed');
              const btn = card.querySelector('.category-btn');
              btn.textContent = 'Get Started';
          }
      });

      // Show/hide calculate button
      const hasAnyData = Object.values(this.data).some(category => 
          Object.keys(category).length > 0
      );
      
      const calculateSection = document.getElementById('calculate-section');
      if (hasAnyData) {
          calculateSection.style.display = 'block';
      } else {
          calculateSection.style.display = 'none';
      }
  }

  calculateEmissions() {
      const results = {
          transportation: this.calculateTransportationEmissions(),
          energy: this.calculateEnergyEmissions(),
          food: this.calculateFoodEmissions(),
          lifestyle: this.calculateLifestyleEmissions()
      };

      results.total = results.transportation + results.energy + results.food + results.lifestyle;
      
      return results;
  }

  calculateTransportationEmissions() {
      const data = this.data.transportation;
      let emissions = 0;

      // Car emissions
      if (data.carMilesPerYear && data.carMpg) {
          const gallonsPerYear = data.carMilesPerYear / data.carMpg;
          emissions += gallonsPerYear * 0.00893; // tons CO2e per gallon
      }

      // Flight emissions
      if (data.flightHoursPerYear) {
          emissions += data.flightHoursPerYear * 0.25; // tons CO2e per hour
      }

      // Public transport (very efficient)
      if (data.publicTransportHoursPerWeek) {
          const hoursPerYear = data.publicTransportHoursPerWeek * 52;
          emissions += hoursPerYear * 0.01; // tons CO2e per hour
      }

      return Math.max(0, emissions);
  }

  calculateEnergyEmissions() {
      const data = this.data.energy;
      let emissions = 0;

      // Electricity emissions
      if (data.electricityKwhPerMonth) {
          const kwhPerYear = data.electricityKwhPerMonth * 12;
          let electricityEmissions = kwhPerYear * 0.000401; // tons CO2e per kWh
          
          // Apply renewable energy reduction
          if (data.renewableEnergy) {
              const renewableReduction = data.renewableEnergy / 100;
              electricityEmissions *= (1 - renewableReduction);
          }
          
          emissions += electricityEmissions;
      }

      // Natural gas emissions
      if (data.naturalGasThermPerMonth) {
          const thermPerYear = data.naturalGasThermPerMonth * 12;
          emissions += thermPerYear * 0.00531; // tons CO2e per therm
      }

      return Math.max(0, emissions);
  }

  calculateFoodEmissions() {
      const data = this.data.food;
      let emissions = 0;

      // Base diet emissions
      const dietEmissions = {
          omnivore: 2.5,
          pescatarian: 1.9,
          vegetarian: 1.7,
          vegan: 1.5
      };

      if (data.dietType) {
          emissions += dietEmissions[data.dietType] || dietEmissions.omnivore;
      } else {
          emissions += dietEmissions.omnivore;
      }

      // Additional meat consumption
      if (data.meatMealsPerWeek) {
          const meatMealsPerYear = data.meatMealsPerWeek * 52;
          emissions += meatMealsPerYear * 0.01; // tons CO2e per meat meal
      }

      // Dairy consumption
      if (data.dairyServingsPerDay) {
          const dairyServingsPerYear = data.dairyServingsPerDay * 365;
          emissions += dairyServingsPerYear * 0.002; // tons CO2e per serving
      }

      // Local and organic food reductions
      let reduction = 1;
      if (data.localFood) {
          reduction -= (data.localFood / 100) * 0.2; // 20% max reduction
      }
      if (data.organicFood) {
          reduction -= (data.organicFood / 100) * 0.1; // 10% max reduction
      }

      emissions *= Math.max(0.5, reduction); // Minimum 50% of base emissions

      return Math.max(0, emissions);
  }

  calculateLifestyleEmissions() {
      const data = this.data.lifestyle;
      let emissions = 2.0; // base lifestyle emissions

      // Shopping frequency
      const shoppingEmissions = {
          minimal: 1.0,
          low: 1.5,
          average: 2.5,
          high: 4.0,
          very_high: 6.0
      };

      if (data.shoppingFrequency) {
          emissions += shoppingEmissions[data.shoppingFrequency] || shoppingEmissions.average;
      } else {
          emissions += shoppingEmissions.average;
      }

      // Clothing purchases
      if (data.newClothesPerMonth) {
          const clothingPerYear = data.newClothesPerMonth * 12;
          emissions += clothingPerYear * 0.02; // tons CO2e per item
      }

      // Waste reduction benefits
      let reduction = 1;
      if (data.recyclingRate) {
          reduction -= (data.recyclingRate / 100) * 0.15; // 15% max reduction
      }
      if (data.wasteReduction) {
          reduction -= (data.wasteReduction / 100) * 0.25; // 25% max reduction
      }
      if (data.secondHandPurchases) {
          reduction -= (data.secondHandPurchases / 100) * 0.3; // 30% max reduction
      }

      emissions *= Math.max(0.3, reduction); // Minimum 30% of calculated emissions

      return Math.max(0, emissions);
  }

  renderResults() {
      const results = this.calculateEmissions();
      const { transportation, energy, food, lifestyle, total } = results;

      // Update main results
      document.getElementById('total-emissions').textContent = total.toFixed(1);
      
      // Update breakdown
      document.getElementById('transport-emissions').textContent = `${transportation.toFixed(1)} tons`;
      document.getElementById('energy-emissions').textContent = `${energy.toFixed(1)} tons`;
      document.getElementById('food-emissions').textContent = `${food.toFixed(1)} tons`;
      document.getElementById('lifestyle-emissions').textContent = `${lifestyle.toFixed(1)} tons`;

      // Update comparisons
      this.updateComparisons(total);
      
      // Update chart
      this.updateChart({ transportation, energy, food, lifestyle, total });
      
      // Update recommendations
      this.updateRecommendations(results);
  }

  updateComparisons(total) {
      const usAverage = 16.5;
      const globalAverage = 4.0;
      const target = 2.0;

      const getStatus = (value, benchmark) => {
          if (value <= benchmark * 0.8) return 'excellent';
          if (value <= benchmark) return 'good';
          if (value <= benchmark * 1.5) return 'average';
          return 'needs-improvement';
      };

      const statusLabels = {
          excellent: 'Excellent',
          good: 'Good',
          average: 'Average',
          'needs-improvement': 'Needs Improvement'
      };

      // US comparison
      const usStatus = getStatus(total, usAverage);
      const usElement = document.getElementById('us-comparison');
      usElement.textContent = statusLabels[usStatus];
      usElement.className = `comparison-status ${usStatus}`;

      // Global comparison
      const globalStatus = getStatus(total, globalAverage);
      const globalElement = document.getElementById('global-comparison');
      globalElement.textContent = statusLabels[globalStatus];
      globalElement.className = `comparison-status ${globalStatus}`;

      // Target comparison
      const targetElement = document.getElementById('target-comparison');
      if (total <= target) {
          targetElement.textContent = 'On Track';
          targetElement.className = 'comparison-status excellent';
      } else {
          targetElement.textContent = 'Above Target';
          targetElement.className = 'comparison-status needs-improvement';
      }
  }

  updateChart(data) {
      const { transportation, energy, food, lifestyle, total } = data;
      
      const categories = [
          { name: 'transportation', value: transportation },
          { name: 'energy', value: energy },
          { name: 'food', value: food },
          { name: 'lifestyle', value: lifestyle }
      ];

      categories.forEach(category => {
          const percentage = total > 0 ? (category.value / total) * 100 : 0;
          const fillElement = document.querySelector(`.chart-fill.${category.name}`);
          const percentageElement = document.querySelector(`[data-category="${category.name}"] .chart-percentage`);
          
          // Animate chart bars
          setTimeout(() => {
              fillElement.style.width = `${percentage}%`;
              percentageElement.textContent = `${percentage.toFixed(1)}%`;
          }, 500);
      });
  }

  updateRecommendations(results) {
      const recommendations = [
          {
              category: 'Transportation',
              title: 'Reduce Car Dependency',
              description: 'Use public transport, bike, or walk for short trips. Consider carpooling for longer journeys.',
              impact: 'High',
              effort: 'Medium'
          },
          {
              category: 'Energy',
              title: 'Switch to Renewable Energy',
              description: 'Contact your utility about green energy plans or consider solar panels.',
              impact: 'High',
              effort: 'Low'
          },
          {
              category: 'Food',
              title: 'Reduce Meat Consumption',
              description: 'Try "Meatless Mondays" or plant-based meals 2-3 times per week.',
              impact: 'Medium',
              effort: 'Low'
          },
          {
              category: 'Lifestyle',
              title: 'Buy Less, Choose Better',
              description: 'Purchase quality items that last longer and consider second-hand options.',
              impact: 'Medium',
              effort: 'Low'
          }
      ];

      const container = document.getElementById('recommendations-grid');
      container.innerHTML = recommendations.map(rec => `
          <div class="recommendation-card">
              <div class="recommendation-header">
                  <div>
                      <div class="recommendation-title">${rec.title}</div>
                      <div class="recommendation-category">${rec.category}</div>
                  </div>
                  <div style="font-size: 1.5rem;">📈</div>
              </div>
              <div class="recommendation-description">${rec.description}</div>
              <div class="recommendation-meta">
                  <div class="meta-item">
                      <span>⚡</span>
                      <span>Impact:</span>
                      <span class="impact-badge impact-${rec.impact.toLowerCase()}">${rec.impact}</span>
                  </div>
                  <div class="meta-item">
                      <span>⏱️</span>
                      <span>Effort:</span>
                      <span class="effort-badge effort-${rec.effort.toLowerCase()}">${rec.effort}</span>
                  </div>
              </div>
          </div>
      `).join('');
  }

  async saveData() {
  const { auth, db } = await import("./firebase.js");
  const { doc, setDoc } = await import(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
  );

  if (!auth.currentUser) return;

  await setDoc(doc(db, "carbonData", auth.currentUser.uid), {
    data: this.data,
    updatedAt: new Date()
  });
}
    async loadData() {
    const { auth, db } = await import("./firebase.js");
    const { doc, getDoc } = await import(
        "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
    );

    if (!auth.currentUser) return;

    const snap = await getDoc(doc(db, "carbonData", auth.currentUser.uid));
    if (snap.exists()) {
        this.data = snap.data().data;
    }
    }

}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new CarbonFootprintCalculator();
});