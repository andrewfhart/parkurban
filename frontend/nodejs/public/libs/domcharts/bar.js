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

DOMCharts.bar = function (table, angle) {
  if (!angle && angle !== 0) {
    angle = 90;
  }
  radians = angle * Math.PI / 180;
  table.addClass('barchart');
  var values = table.find('td');
  var max = Math.max.apply(null, $.map(values, function (x) {return parseFloat($(x).text());}));
  $.each(values, function (_, x) {
    var val = parseInt($(x).text(), 10);
    var height = val / max;
    $(x).empty().append('<div title="' + val + '" style="height: ' + (height * 100) + '%"></div>');
  });
  var ths = table.find('th');
  var maxHeight = $(ths[0]).height();
  var widths = $.map(ths, function (th) {return $(th).width();});
  var maxWidth = Math.max.apply(null, widths);
  // Calculate the "excess" lengths that the block's hypotenuse projects by
  // when rotated.
  var x = (maxHeight * Math.tan(radians)) * 0.5;
  var y = (maxHeight / Math.tan(radians)) * 0.5;
  var footHeight = Math.round(Math.sin(radians) * (maxWidth + y));
  table.find('tfoot tr').css('height', footHeight);
  ths.each(function (i, th) {
    var width  = Math.round(Math.cos(radians) * ($(th).width() + x));
    var height = Math.round(Math.sin(radians) * ($(th).width() + y));
    var translateX = maxHeight * 0.5 - width;
    var translateY = height - footHeight / 2 - maxHeight / 2;
    var transform = 'translateX(' + translateX + 'px) translateY(' + translateY + 'px) rotate(' + -angle + 'deg)';
    $(th).css({'max-width': maxHeight
              ,'-webkit-transform': transform
              ,'-moz-transform': transform
              ,'-ms-transform': transform
              ,'-o-transform': transform
              ,'transform': transform
              });
    if (i === 0) {
      // Add padding for text jutting out of the footer.
      table.css('padding-left', (width - translateX)/2 - maxHeight/2);
    }
  });
  // Empty bars look bad and/or confusing. Make sure that all bars are at least
  // 1px tall.
  table.find('td > div').each(function (_, div) {
    if ($(div).height() === 0) {
      $(div).css('height', '1px');
    }
  });
  return table;
};

DOMCharts.barTable = function (data, labels) {
  var table = $('<table></table>');
  var tbody = $('<tbody></tbody>').appendTo(table);
  var tfoot = $('<tfoot></tfoot>').appendTo(table);
  var dataRow = $('<tr></tr>').appendTo(tbody);
  var headerRow = $('<tr></tr>').appendTo(tfoot);
  for (var i = 0; i < data.length; i++) {
    // Convert spaces to non-breaking spaces or we'll end up with headers that
    // are too wide.
    $('<th>' + String(labels[i]).replace(/\s/g, '&nbsp;') + '</th>').appendTo(headerRow);
    $('<td>' + data[i] + '</td>').appendTo(dataRow);
  }
  return table;
}
