document.addEventListener('DOMContentLoaded', () => {
    const tooltipContainers = document.querySelectorAll('.tooltip-container');
    let activeTooltip = null;
  
    function positionTooltip(tooltip, trigger) {
      const tooltipRect = tooltip.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
  
      // Reset position and width
      tooltip.style.left = '';
      tooltip.style.right = '';
      tooltip.style.top = '';
      tooltip.style.bottom = '';
      tooltip.style.width = '';
  
      // Set max-width based on viewport
      const maxWidth = Math.min(300, viewportWidth - 20); // 20px margin
      tooltip.style.maxWidth = `${maxWidth}px`;
  
      // Recalculate tooltip dimensions after setting max-width
      const updatedTooltipRect = tooltip.getBoundingClientRect();
  
      // Position above by default
      let topPosition = -updatedTooltipRect.height - 10; // 10px gap
  
      // Check if tooltip goes above viewport
      if (triggerRect.top + topPosition < 0) {
        // Position below if it goes above viewport
        topPosition = triggerRect.height + 10;
        tooltip.classList.add('bottom');
      } else {
        tooltip.classList.remove('bottom');
      }
  
      tooltip.style.top = `${topPosition}px`;
  
      // Center align the tooltip
      let leftPosition = (triggerRect.width - updatedTooltipRect.width) / 2;
  
      // Check if tooltip goes beyond left or right viewport edge
      if (triggerRect.left + leftPosition < 0) {
        // Align to left edge of viewport
        leftPosition = -triggerRect.left + 5;
      } else if (triggerRect.left + leftPosition + updatedTooltipRect.width > viewportWidth) {
        // Align to right edge of viewport
        leftPosition = viewportWidth - (triggerRect.left + updatedTooltipRect.width) - 5;
      }
  
      tooltip.style.left = `${leftPosition}px`;
    }
  
    function showTooltip(tooltip, trigger) {
      if (activeTooltip && activeTooltip !== tooltip) {
        hideTooltip(activeTooltip);
      }
      tooltip.classList.add('show');
      positionTooltip(tooltip, trigger);
      activeTooltip = tooltip;
    }
  
    function hideTooltip(tooltip) {
      tooltip.classList.remove('show');
      activeTooltip = null;
    }
  
    tooltipContainers.forEach((container) => {
      const trigger = container.querySelector('.tooltip-trigger');
      const tooltip = container.querySelector('.tooltip-content');
      
      if (!trigger || !tooltip) return;
  
      trigger.addEventListener('mouseenter', () => showTooltip(tooltip, trigger));
      trigger.addEventListener('mouseleave', () => hideTooltip(tooltip));
  
      // For mobile devices
      trigger.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (tooltip.classList.contains('show')) {
          hideTooltip(tooltip);
        } else {
          showTooltip(tooltip, trigger);
        }
      }, { passive: false });
    });
  
    // Close tooltip when tapping outside
    document.addEventListener('touchstart', (e) => {
      if (activeTooltip && !activeTooltip.contains(e.target) && !e.target.classList.contains('tooltip-trigger')) {
        hideTooltip(activeTooltip);
      }
    }, { passive: true });
  
    // Reposition tooltips on window resize
    window.addEventListener('resize', () => {
      if (activeTooltip) {
        const trigger = activeTooltip.previousElementSibling;
        positionTooltip(activeTooltip, trigger);
      }
    });
  });