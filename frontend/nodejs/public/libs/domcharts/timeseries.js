// Copyright 2011, 2012 Chris Forno

// This file is part of DOMCharts.

// DOMCharts is free software: you can redistribute it and/or modify it under
// the terms of the GNU Affero General Public License as published by the Free
// Software Foundation, either version 3 of the License, or (at your option)
// any later version.

// DOMCharts is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
// for more details.

// You should have received a copy of the GNU Affero General Public License
// along with DOMCharts. If not, see <http://www.gnu.org/licenses/>.

var DOMCharts = DOMCharts || {};

DOMCharts.expandTimeSeries = function (data, start, step, formatter) {
  var barData = {}
  $.each(data, function (i, v) {
    barData[formatter(new Date((start + (step * i)) * 1000))] = v;
  });
  return barData;
};