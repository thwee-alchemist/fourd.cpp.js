#include "Settings.h"


Settings::Settings(
  float _repulsion, 
  float _epsilon, 
  float _inner_distance, 
  float _attraction, 
  float _friction, 
  float _gravity,
  float _time_dilation){

  repulsion = _repulsion;
  epsilon = _epsilon;
  inner_distance = _inner_distance;
  attraction = _attraction;
  friction = _friction;
  gravity = _gravity;
  time_dilation = _time_dilation;
};

float Settings::get_repulsion() const {
  return repulsion;
}

void Settings::set_repulsion(float val){
  repulsion = val;
}

float Settings::get_epsilon() const {
  return epsilon;
}

void Settings::set_epsilon(float val){
  epsilon = val;
}

float Settings::get_inner_distance() const {
  return inner_distance;
};

void Settings::set_inner_distance(float val){
  inner_distance = val;
}

float Settings::get_attraction() const {
  return attraction;
}

void Settings::set_attraction(float val){
  attraction = val;
}

float Settings::get_friction() const {
  return friction;
}

void Settings::set_friction(float val){
  friction = val;
}

float Settings::get_gravity() const {
  return gravity;
}

void Settings::set_gravity(float val){
  gravity = val;
}

float Settings::get_time_dilation() const {
  return time_dilation;
}

void Settings::set_time_dilation(float val){
  time_dilation = val;
}
